import { UserToBeCreatedEncrypter } from "../entities/User/UserToBeCreated";
import bcrypt from 'bcryptjs';

export class BcrypEncrypter implements UserToBeCreatedEncrypter {
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(value, salt);

    return hash
  }
}