import * as Crypto from 'crypto-js';

export function hashWithHmacSha1(text: string, key: string): string {
  return Crypto.HmacSHA1(text, key).toString(Crypto.enc.Hex);
}
