import { TaskStatus } from "../../entities/Task/Task";
import { TokenDecoder } from "../../interfaces/TokenDecoder";
import { ChangeTaskStatusRepository, ChangeTaskStatusUseCase } from "./ChangeTaskStatusUseCase"

class TokenDecoderMock implements TokenDecoder {
  decode = jest.fn(() => ({ id: 'any-id' }));
}

class RepositoryMock implements ChangeTaskStatusRepository {
  updateTaskStatus = jest.fn();
}

const makeSut = () => {
  const tokenDecoder = new TokenDecoderMock();
  const repository = new RepositoryMock();
  const usecase = new ChangeTaskStatusUseCase(tokenDecoder, repository);

  return {
    usecase,
    tokenDecoder,
    repository
  }
}

describe('ChangeTaskStatusUseCase', () => {
  it('should call tokenDecoder decode', async () => {
    const { tokenDecoder, usecase } = makeSut();

    await usecase.execute({ status: TaskStatus.TODO, taskId: 'any-task-id', token: 'any-token' });

    expect(tokenDecoder.decode).toHaveBeenCalledTimes(1)
  })

  describe('Given invalid task status', () => {
    it('should throw INVALID_STATUS', () => {
      const { usecase } = makeSut();

      expect(async () => {
        await usecase.execute({
          status: 'invalid-status',
          taskId: 'any-task-id', 
          token: 'any-token'
        });
      }).rejects.toThrow('INVALID_STATUS')
    })
  })

  describe('Given valid task status', () => {
    it('should call repository updateTaskStatus', async () => {
      const { usecase, repository } = makeSut();

      await usecase.execute({ status: TaskStatus.TODO, taskId: 'any-task-id', token: 'any-token' });

      expect(repository.updateTaskStatus).toHaveBeenCalledTimes(1)
    })
  })
})