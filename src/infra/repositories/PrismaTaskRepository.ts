import { TaskDTO } from '../../entities/Task/Task';
import { CreateTaskRepository } from '../../usecases/CreateTask/CreateTaskUseCase';
import { prisma } from '../prisma';

export class PrismaTaskRepository implements CreateTaskRepository {
  async create(task: TaskDTO, userId: string): Promise<void> {
    await prisma.$connect();

    await prisma.task.create({
      data: {
        description: task.description,
        status: task.status,
        title: task.title,
        owner: {
          connect: {
            id: userId
          }
        }
      }
    })
  }
}