import { UserToBeAuthenticatedDTO } from "../../entities/User/UserToBeAuthenticated";
import { UserToBeCreatedDTO } from "../../entities/User/UserToBeCreated";
import { AuthenticateUserRepository } from "../../usecases/AuthenticateUser/AuthenticateUserUseCase";
import { CreateUserRepository } from "../../usecases/CreateUser/CreateUserUseCase";
import { prisma } from '../prisma';

export class PrismaUserRepository implements CreateUserRepository, AuthenticateUserRepository {
  async create(user: UserToBeCreatedDTO): Promise<{ id: string; }> {
    await prisma.$connect();

    const created = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password
      }
    })

    return {
      id: created.id
    }
  }

  async getUserByEmail(email: string): Promise<(UserToBeAuthenticatedDTO & { id: string; }) | null> {
    await prisma.$connect();

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if(!user) return null;

    return {
      email,
      id: user.id,
      password: user.password
    }
  }
}