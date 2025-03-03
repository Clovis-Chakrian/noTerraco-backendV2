import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
class PasswordEncoderService {
  async encript(password: string): Promise<string> {
    const salt = process.env.PASSWORD_ENCODER_SALT as string;

    return await bcrypt.hash(password, Number(salt));
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

export { PasswordEncoderService };