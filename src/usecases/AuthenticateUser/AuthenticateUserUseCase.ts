import { UserToBeAuthenticated, UserToBeAuthenticatedDTO } from "../../entities/User/UserToBeAuthenticated";
import { TokenPayload } from "../../interfaces/TokenPayload";

interface AuthenticateUserParams {
  email: string;
  password: string;
}



export interface AuthenticateUserRepository {
  getUserByEmail(email: string): Promise<UserToBeAuthenticatedDTO & { id: string } | null>
}

export interface AuthenticateUserEncrypter {
  compare(password: string, hash: string): Promise<boolean>
}

export interface AuthenticateUserTokenGenerator {
  generate(payload: TokenPayload): string 
}

export class AuthenticateUserUseCase {
  constructor(
    private repository: AuthenticateUserRepository,
    private encrypter: AuthenticateUserEncrypter,
    private tokenGenerator: AuthenticateUserTokenGenerator
  ) {}

  async execute(params: AuthenticateUserParams) {
    const user = new UserToBeAuthenticated({
      email: params.email,
      password: params.password
    })

    const userFoundByEmail = await this.repository.getUserByEmail(user.getEmail());

    if(!userFoundByEmail) {
      throw new Error('INVALID_AUTHENTICATION');
    }

    const isValidPassword = await this.encrypter.compare(user.getPassword(), userFoundByEmail.password);

    if(!isValidPassword) {
      throw new Error('INVALID_AUTHENTICATION');
    }

    const token = this.tokenGenerator.generate({ id: userFoundByEmail.id });

    return {
      token
    }
  }
}