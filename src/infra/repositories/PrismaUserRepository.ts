import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { UserToBeAuthenticatedDTO } from "../../entities/User/UserToBeAuthenticated";
import { UserToBeCreatedDTO } from "../../entities/User/UserToBeCreated";
import { ConflictError } from "../../errors/ConflictError";
import { AuthenticateUserRepository } from "../../usecases/AuthenticateUser/AuthenticateUserUseCase";
import { CreateUserRepository } from "../../usecases/CreateUser/CreateUserUseCase";
import { PrismaErrors } from "../errors";
import { prisma } from '../prisma';

export class PrismaUserRepository implements CreateUserRepository, AuthenticateUserRepository {
  async create(user: UserToBeCreatedDTO): Promise<{ id: string; }> {
    try {
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
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if(err.code === PrismaErrors.UNIQUE_CONSTRAINT_FAILED) {
          throw new ConflictError('REPEATED_EMAIL')
        }
      }
  
      throw new Error('UNKNOWN_ERROR')
    }
  }

  async getUserByEmail(email: string): Promise<(UserToBeAuthenticatedDTO & { id: string; }) | null> {
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