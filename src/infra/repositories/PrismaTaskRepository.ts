import { TaskDTO, TaskStatus } from '../../entities/Task/Task';
import { CreateTaskRepository } from '../../usecases/CreateTask/CreateTaskUseCase';
import { GetMyTasksRepository, TaskDTOWithId } from '../../usecases/GetMyTasks/GetMyTasksUseCase';
import { prisma } from '../prisma';

export class PrismaTaskRepository implements CreateTaskRepository, GetMyTasksRepository {
  async create(task: TaskDTO, userId: string): Promise<void> {
    await prisma.$connect();

    await prisma.task.create({
      data: {
        description: task.description,
        status: task.status,
        title: task.title,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  async getTasksByUserId(userId: string): Promise<TaskDTOWithId[]> {
    await prisma.$connect();

    const tasks = await prisma.task.findMany({
      where: {
        userId
      }
    })
    
    return tasks.map<TaskDTOWithId>(task => ({
      id: task.id,
      description: task.description,
      status: task.status as TaskStatus,
      title: task.title,
    }));
  }
}