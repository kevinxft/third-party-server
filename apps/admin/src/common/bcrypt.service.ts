import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private static readonly SALT_ROUNDS: number = 10;

  static async compare(rawStr: string, hashedStr: string) {
    return await bcrypt.compare(rawStr, hashedStr);
  }

  static async hash(rawStr: string, salt?: string) {
    return bcrypt.hashSync(rawStr, salt || BcryptService.SALT_ROUNDS);
  }
}
