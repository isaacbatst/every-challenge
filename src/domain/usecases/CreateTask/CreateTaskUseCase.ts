import { TokenDecoder } from "../../interfaces/TokenDecoder";
import { Task, TaskDTO } from "../../entities/Task/Task";

interface CreateTaskParams {
  title: string;
  description: string;
  status: string;
  token: string
}

export interface CreateTaskRepository {
  create(task: TaskDTO, userId: string): Promise<void>
}

export class CreateTaskUseCase {
  constructor(
    private repository: CreateTaskRepository,
    private tokenDecoder: TokenDecoder
  ){}

  async execute(params: CreateTaskParams) {
    const tokenPayload = this.tokenDecoder.decode(params.token)

    const task = new Task({
      description: params.description,
      status: params.status,
      title: params.title
    })  

    await this.repository.create({
      description: task.getDescription(),
      status: task.getStatus(),
      title: task.getTitle()
    }, tokenPayload.id)
  }
}