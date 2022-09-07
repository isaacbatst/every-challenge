import { Task, TaskDTO, TaskStatus } from "../../entities/Task/Task";

interface CreateTaskParams {
  title: string;
  description: string;
  status: string;
}

export interface CreateTaskRepository {
  create(task: TaskDTO): Promise<void>
}

export class CreateTaskUseCase {
  constructor(
    private repository: CreateTaskRepository
  ){}

  async execute(params: CreateTaskParams) {
    const task = new Task({
      description: params.description,
      status: params.status,
      title: params.title
    })  

    await this.repository.create({
      description: task.getDescription(),
      status: task.getStatus(),
      title: task.getTitle()
    })
  }
}