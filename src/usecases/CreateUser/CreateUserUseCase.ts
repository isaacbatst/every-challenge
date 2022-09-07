import { UserToBeCreated, UserToBeCreatedDTO, UserToBeCreatedEncrypter } from "../../entities/User/UserToBeCreated";
import { TokenGenerator } from "../../interfaces/TokenGenerator";

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserRepository {
  create(user: UserToBeCreatedDTO): Promise<{ id: string }>
}

export class CreateUserUseCase {
  constructor(
    private encrypter: UserToBeCreatedEncrypter,
    private repository: CreateUserRepository,
    private tokenGenerator: TokenGenerator
  ){}

  async execute(params: CreateUserParams) {
    const user = new UserToBeCreated(params);

    const hash = await this.encrypter.hash(user.getPassword());

    const { id } = await this.repository.create({
      email: user.getEmail(),
      name: user.getName(),
      password: hash
    })

    const token = this.tokenGenerator.generate({ id });

    return {
      token
    }
  }
}