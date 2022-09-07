import { TaskStatus } from "../../entities/Task/Task"
import { CreateTaskRepository, CreateTaskUseCase } from "./CreateTaskUseCase"

class RepositoryMock implements CreateTaskRepository {
  create = jest.fn()
}

const validTask =   {
  description: 'any-description',
  status: TaskStatus.TODO,
  title: 'any-title'
}

describe('CreateTaskUseCase', () => {
  describe('Given a valid task', () => {
    it('should call repository create', async () => {
      const repository = new RepositoryMock();
      const usecase = new CreateTaskUseCase(repository);

      await usecase.execute(validTask);
 
      expect(repository.create).toHaveBeenCalledTimes(1)
    })
  })
})