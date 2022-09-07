import { Task, TaskStatus } from "../../entities/Task/Task";
import { TokenDecoder } from "../../interfaces/TokenDecoder";

interface ChangeTaskStatusParams {
  token: string;
  status: string;
  taskId: string;
}

export interface ChangeTaskStatusRepository {
  updateTaskStatus(taskId: string, status: TaskStatus, userId: string): Promise<void>
}

export class ChangeTaskStatusUseCase {
  constructor(
    private tokenDecoder: TokenDecoder,
    private repository: ChangeTaskStatusRepository
  ){}

  async execute(params: ChangeTaskStatusParams){
    const { status,taskId, token } = params

    const { id } = this.tokenDecoder.decode(token); 

    const isValidStatus = Task.isValidStatus(status);

    if(!isValidStatus) {
      throw new Error('INVALID_STATUS')
    }

    await this.repository.updateTaskStatus(taskId, status, id);
  }
}