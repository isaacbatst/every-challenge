import { UserToBeCreatedEncrypter } from "../entities/User/UserToBeCreated";
import bcrypt from 'bcryptjs';
import { AuthenticateUserEncrypter } from "../usecases/AuthenticateUser/AuthenticateUserUseCase";

export class BcrypEncrypter implements UserToBeCreatedEncrypter, AuthenticateUserEncrypter {
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(value, salt);

    return hash;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}