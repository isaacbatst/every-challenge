import { Task, TaskDTOWithIds, TaskStatus } from "../../entities/Task/Task";
import { AuthorizationError } from "../../errors/AuthorizationError";
import { BadEntityError } from "../../errors/BadEntityError";
import { NotFoundError } from "../../errors/NotFoundError";
import { TokenDecoder } from "../../interfaces/TokenDecoder";

interface ChangeTaskStatusParams {
  token: string;
  status: string;
  taskId: string;
}

export interface ChangeTaskStatusRepository {
  updateTaskStatus(taskId: string, status: TaskStatus): Promise<void>,
  getTaskById(taskId: string): Promise<TaskDTOWithIds | null>
}

export class ChangeTaskStatusUseCase {
  constructor(
    private tokenDecoder: TokenDecoder,
    private repository: ChangeTaskStatusRepository
  ){}

  async execute(params: ChangeTaskStatusParams){
    const { status, taskId, token } = params

    const { id: userId } = this.tokenDecoder.decode(token); 

    const task = await this.repository.getTaskById(taskId);

    if(!task) {
      throw new NotFoundError('TASK_NOT_FOUND');
    }

    if(task.userId !== userId) {
      throw new AuthorizationError('USER_NOT_ALLOWED_TO_EDIT_REQUESTED_TASK');
    }

    const isValidStatus = Task.isValidStatus(status);

    if(!isValidStatus) {
      throw new BadEntityError('INVALID_STATUS')
    }

    await this.repository.updateTaskStatus(taskId, status);
  }
}