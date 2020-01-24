import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptService {
  private encryption_key: Buffer = Buffer.alloc(32);
  private iv: Buffer = Buffer.alloc(16);
  private cipherName = 'aes-256-cbc';
  constructor() {}

  encrypt(val: string): string {
    const cipher = crypto.createCipheriv(this.cipherName, Buffer.from(this.encryption_key), this.iv);
    let encrypted = cipher.update(val);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return this.iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  decrypt(val: string) {
    const textParts = val.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(this.cipherName, Buffer.from(this.encryption_key), iv);
    let decrypted = decipher.update(encryptedText);
   
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
