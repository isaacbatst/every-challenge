import { TaskStatus } from "../../entities/Task/Task"
import { CreateTaskRepository, CreateTaskTokenDecoder, CreateTaskUseCase } from "./CreateTaskUseCase"

class RepositoryMock implements CreateTaskRepository {
  create = jest.fn()
}

class TokenDecoderMock implements CreateTaskTokenDecoder {
  decode = jest.fn(() => ({ id: 'any-id' }))
}

const validParams =   {
  description: 'any-description',
  status: TaskStatus.TODO,
  title: 'any-title',
  token: 'any-token'
}

const makeSut = () => {
  const repository = new RepositoryMock();
  const tokenDecoder = new TokenDecoderMock();
  const usecase = new CreateTaskUseCase(repository, tokenDecoder);

  return {
    usecase,
    repository,
    tokenDecoder
  }
}

describe('CreateTaskUseCase', () => {
  describe('Given a valid task', () => {
    it('should call token decoder', async() => {
      const { tokenDecoder, usecase } = makeSut();
      
      await usecase.execute(validParams);
      
      expect(tokenDecoder.decode).toHaveBeenCalledTimes(1)
    })
    
    it('should call repository create', async () => {
      const { repository, usecase } = makeSut();
      
      await usecase.execute(validParams);
 
      expect(repository.create).toHaveBeenCalledTimes(1)
    })
  })
})