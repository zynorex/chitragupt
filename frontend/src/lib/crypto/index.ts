import { generateAESKey, exportKeyToHex, encryptData, EncryptedPayload, importKeyFromHex, decryptData } from "./aes";
import { splitKey, reconstructKey, Shard } from "./sss";
import { wipeBuffer } from "./utils";

export interface ProcessedEvidence {
  encryptedData: EncryptedPayload;
  shards: Shard[];
}

/**
 * Encrypts a File and securely splits the AES encryption key into shards.
 * Implements strict memory wipe on the initial buffer.
 * 
 * @param file The literal File object
 * @param numGuardians Total number of shards to create
 * @param threshold Minimum shards required to reconstruct
 */
export async function secureEvidence(
  file: File,
  numGuardians: number,
  threshold: number
): Promise<ProcessedEvidence> {
  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = new Uint8Array(arrayBuffer);

  try {
    const key = await generateAESKey();
    const encryptedParams = await encryptData(key, fileBuffer);
    
    const hexKey = await exportKeyToHex(key);
    const shards = splitKey(hexKey, numGuardians, threshold);
    
    return {
      encryptedData: encryptedParams,
      shards: shards,
    };
  } finally {
    // Ensuring plaintext data is cleared from memory even if an error occurs
    wipeBuffer(fileBuffer);
  }
}

/**
 * Restores an encrypted file payload back into a native File object,
 * provided enough shards are supplied.
 * 
 * @param payload The encrypted ciphertext + IV
 * @param shards The collected key shards (must be >= threshold)
 * @param mimeType Expected mime type of the decrypted file (fallback to application/octet-stream)
 * @param originalFilename Expected output file name
 */
export async function recoverEvidence(
  payload: EncryptedPayload,
  shards: Shard[],
  mimeType: string = "application/octet-stream",
  originalFilename: string = "recovered-evidence"
): Promise<File> {
  const hexKey = reconstructKey(shards);
  const key = await importKeyFromHex(hexKey);
  
  let decryptedBuffer: Uint8Array | null = null;
  try {
    decryptedBuffer = await decryptData(key, payload);
    const blob = new Blob([decryptedBuffer as BlobPart], { type: mimeType });
    const file = new File([blob], originalFilename, { type: mimeType });
    
    return file;
  } finally {
    // Clear decrypted buffer immediately from typed array
    if (decryptedBuffer) {
      wipeBuffer(decryptedBuffer);
    }
  }
}

// Re-export specific interfaces that consumers might need
export type { EncryptedPayload } from "./aes";
export type { Shard } from "./sss";
