/**
 * Utility functions for Cryptography operations in Chitragupt.
 * Focuses on safe memory management and formatting data for Shamir's Secret Sharing.
 */

/**
 * Converts a Uint8Array to a hex string securely in-memory.
 */
export function bufferToHex(buffer: Uint8Array): string {
  let hexString = "";
  for (let i = 0; i < buffer.length; i++) {
    const hex = buffer[i].toString(16).padStart(2, "0");
    hexString += hex;
  }
  return hexString;
}

/**
 * Converts a hex string back to a Uint8Array securely.
 */
export function hexToBuffer(hexString: string): Uint8Array {
  if (hexString.length % 2 !== 0) {
    throw new Error("Invalid hex string (odd length).");
  }
  const length = hexString.length / 2;
  const buffer = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    buffer[i] = parseInt(hexString.slice(i * 2, i * 2 + 2), 16);
  }
  return buffer;
}

/**
 * Zeros out a given Uint8Array to prevent sensitive data from lingering in memory.
 * Note: Garbage Collection handles eventual deallocation, but zeroing first prevents OS RAM
 * dumps from recovering the immediate data.
 */
export function wipeBuffer(buffer: Uint8Array): void {
  buffer.fill(0);
}

/**
 * Zeros out an ArrayBuffer by viewing it as a Uint8Array first.
 */
export function wipeArrayBuffer(buffer: ArrayBuffer): void {
  const view = new Uint8Array(buffer);
  wipeBuffer(view);
}
