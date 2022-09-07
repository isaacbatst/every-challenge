import { TaskDTOWithIds } from "../../entities/Task/Task";
import { TokenDecoder } from "../../interfaces/TokenDecoder";

interface GetMyTasksParams {
  token: string
}

export interface GetMyTasksRepository {
  getTasksByUserId(userId: string): Promise<TaskDTOWithIds[]>
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