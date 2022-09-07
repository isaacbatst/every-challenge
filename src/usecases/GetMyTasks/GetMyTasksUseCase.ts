import { TaskDTO } from "../../entities/Task/Task";
import { TokenDecoder } from "../../interfaces/TokenDecoder";

interface GetMyTasksParams {
  token: string
}

export interface TaskDTOWithId extends TaskDTO { 
  id: string 
}

export interface GetMyTasksRepository {
  getTasksByUserId(userId: string): Promise<TaskDTOWithId[]>
}

export class GetMyTasksUseCase {
  constructor(
    private tokenDecoder: TokenDecoder,
    private repository: GetMyTasksRepository
  ) {}

  async execute(params: GetMyTasksParams) {
    const { id } = this.tokenDecoder.decode(params.token);

    const tasks = await this.repository.getTasksByUserId(id);

    return tasks;
  }
}