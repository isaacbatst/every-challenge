import { UserToBeCreated, UserToBeCreatedDTO, UserToBeCreatedEncrypter } from "../../entities/User/UserToBeCreated";

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserRepository {
  create(user: UserToBeCreatedDTO): Promise<void>
}

export interface CreateUserTokenGenerator {
  generate(): string
}

export class CreateUserUseCase {
  constructor(
    private encrypter: UserToBeCreatedEncrypter,
    private repository: CreateUserRepository,
    private tokenGenerator: CreateUserTokenGenerator
  ){}

  async execute(params: CreateUserParams) {
    const user = new UserToBeCreated(params, this.encrypter);

    await this.repository.create({
      email: user.getEmail(),
      name: user.getName(),
      password: user.getPassword()
    })

    const token = this.tokenGenerator.generate();

    return {
      token
    }
  }
}