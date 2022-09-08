import { TokenDecoder } from "../../interfaces/TokenDecoder";
import { GetMyTasksRepository, GetMyTasksUseCase } from "./GetMyTasksUseCase";

class TokenDecoderMock implements TokenDecoder {
  decode = jest.fn(() => ({ id: 'any-id' }));
}

class RepositoryMock implements GetMyTasksRepository {
  getTasksByUserId = jest.fn();
}

const makeSut = () => {
  const repository = new RepositoryMock();
  const tokenDecoder = new TokenDecoderMock();
  const usecase = new GetMyTasksUseCase(tokenDecoder, repository);

  return {
    usecase,
    repository,
    tokenDecoder
  }
}

describe('GetMyTasksUseCase', () => {
  it('should call tokenDecoder decode', async () => {
    const { tokenDecoder, usecase } = makeSut();

    await usecase.execute({ token: 'any-token' })

    expect(tokenDecoder.decode).toHaveBeenCalledTimes(1)
  })

  it('should call repository getTasksByUserId', async () => {
    const { repository, usecase } = makeSut();

    await usecase.execute({ token: 'any-token' })

    expect(repository.getTasksByUserId).toHaveBeenCalledTimes(1)
  })
})