declare module 'secrets.js-grempe' {
  export interface SecretsConfig {
    bits?: number;
    radix?: number;
    minBits?: number;
    maxBits?: number;
    bytesPerChar?: number;
    maxBytesPerChar?: number;
  }

  export function share(
    secret: string,
    numShares: number,
    threshold: number,
    padLength?: number
  ): string[];

  export function combine(shares: string[]): string;

  export function str2hex(str: string, bytesPerChar?: number): string;
  export function hex2str(hex: string, bytesPerChar?: number): string;
  export function random(bits: number): string;
  
  export function setRNG(rngFunction: (bits: number) => string): void;
  export function getConfig(): SecretsConfig;
  export function extractShareComponents(share: string): { bits: number; id: number; data: string } | null;
}
