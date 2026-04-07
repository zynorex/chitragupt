import { bufferToHex, hexToBuffer, wipeBuffer, wipeArrayBuffer } from "./utils";

const ALGO = "AES-GCM";
const KEY_LENGTH = 256;
const IV_LENGTH = 12;

export interface EncryptedPayload {
  ciphertext: Uint8Array;
  iv: Uint8Array;
}

export async function generateAESKey(): Promise<CryptoKey> {
  return await window.crypto.subtle.generateKey(
    {
      name: ALGO,
      length: KEY_LENGTH,
    },
    true, // Extractable so we can split it
    ["encrypt", "decrypt"]
  );
}

export async function exportKeyToHex(key: CryptoKey): Promise<string> {
  const rawKey = await window.crypto.subtle.exportKey("raw", key);
  const buffer = new Uint8Array(rawKey);
  const hex = bufferToHex(buffer);
  wipeArrayBuffer(rawKey); // Wipe the exported buffer
  return hex;
}

export async function importKeyFromHex(hex: string): Promise<CryptoKey> {
  const buffer = hexToBuffer(hex);
  const key = await window.crypto.subtle.importKey(
    "raw",
    buffer as ArrayBufferView | ArrayBuffer as BufferSource,
    { name: ALGO },
    true,
    ["encrypt", "decrypt"]
  );
  wipeBuffer(buffer);
  return key;
}

export async function encryptData(key: CryptoKey, data: Uint8Array): Promise<EncryptedPayload> {
  const iv = window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: ALGO,
      iv: iv as BufferSource,
    },
    key,
    data as BufferSource
  );
  return {
    ciphertext: new Uint8Array(encryptedBuffer),
    iv: iv,
  };
}

export async function decryptData(key: CryptoKey, payload: EncryptedPayload): Promise<Uint8Array> {
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: ALGO,
      iv: payload.iv as BufferSource,
    },
    key,
    payload.ciphertext as BufferSource
  );
  return new Uint8Array(decryptedBuffer);
}
