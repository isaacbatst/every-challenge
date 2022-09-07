import { UserDTO, User } from "../../entities/User";

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface Encrypter {
  hash(value: string): string
}

export interface CreateUserRepository {
  create(user: UserDTO): Promise<void>
}

export interface TokenGenerator {
  generate(): string
}

export class CreateUserUseCase {
  constructor(
    private encrypter: Encrypter,
    private repository: CreateUserRepository,
    private tokenGenerator: TokenGenerator
  ){}

  async execute(params: CreateUserParams) {
    const user = new User(params);

    const hash = this.encrypter.hash(user.getPassword());

    await this.repository.create({
      email: user.getEmail(),
      name: user.getName(),
      password: hash
    })

    const token = this.tokenGenerator.generate();

    return {
      token
    }
  }
}