import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { TaskDTO, TaskDTOWithIds, TaskStatus } from '../../entities/Task/Task';
import { NotFoundError } from '../../errors/NotFoundError';
import { ValidationError } from '../../errors/ValidationError';
import { ChangeTaskStatusRepository } from '../../usecases/ChangeTaskStatus/ChangeTaskStatusUseCase';
import { CreateTaskRepository } from '../../usecases/CreateTask/CreateTaskUseCase';
import { GetMyTasksRepository } from '../../usecases/GetMyTasks/GetMyTasksUseCase';
import { PrismaErrors } from '../errors';
import { prisma } from '../prisma';

export class PrismaTaskRepository implements CreateTaskRepository, GetMyTasksRepository, ChangeTaskStatusRepository {
  async create(task: TaskDTO, userId: string): Promise<void> {
    try {
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
    } catch (err) {
      if(err instanceof PrismaClientKnownRequestError) {
        if(err.code === PrismaErrors.DEPENDS_ON_NOT_FOUND_RECORD) {
          throw new NotFoundError('USER_NOT_FOUND');
        }
      }

      throw new Error('UNKNOWN_ERROR')
    }
  }

  async getTasksByUserId(userId: string): Promise<TaskDTOWithIds[]> {
    const tasks = await prisma.task.findMany({
      where: {
        userId
      }
    })
    
    return tasks.map<TaskDTOWithIds>(task => ({
      ...task,
      status: task.status as TaskStatus,
    }));
  }

  async getTaskById(taskId: string): Promise<TaskDTOWithIds | null> {
    try {
      const task = await prisma.task.findUnique({
        where: {
          id: taskId
        }
      }) 
  
      if(!task) return null;
  
      return {
        ...task,
        status: task.status as TaskStatus,
      }
    } catch (err) {
      if(err instanceof PrismaClientKnownRequestError) {
        if(err.code === PrismaErrors.INCONSISTENT_COLUMN_DATA) {
          throw new ValidationError('INVALID_STATUS_OR_ID');
        }
      }

      throw new Error('UNKNOWN_ERROR')
    }
  }

  async updateTaskStatus(taskId: string, status: TaskStatus): Promise<void> {
    try {
      await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          status
        }
      })
    } catch(err) {
      if(err instanceof PrismaClientKnownRequestError) {
        if(err.code === PrismaErrors.INCONSISTENT_COLUMN_DATA) {
          throw new ValidationError('INVALID_STATUS_OR_ID');
        }
      }

      throw new Error('UNKNOWN_ERROR')
    }
  }
}