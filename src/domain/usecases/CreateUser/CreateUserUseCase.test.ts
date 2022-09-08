import { UserToBeCreatedDTO, UserToBeCreatedEncrypter } from "../../entities/User/UserToBeCreated"
import { TokenGenerator } from "../../interfaces/TokenGenerator"
import { CreateUserRepository, CreateUserUseCase } from "./CreateUserUseCase"

class EncrypterMock implements UserToBeCreatedEncrypter {
  hash = jest.fn()
}

class TokenGeneratorMock implements TokenGenerator {
  generate = jest.fn()
}

class CreateUserRepositoryMock implements CreateUserRepository {
  create = jest.fn(async () => ({ id: 'any-id' }))
}

const validUser: UserToBeCreatedDTO = { 
  email: 'any@email.com',
  name: 'any-name',
  password: '1234567#a'
} 

const makeSut = () => {
  const repository = new CreateUserRepositoryMock();
  const encrypter = new EncrypterMock();
  const tokenGenerator = new TokenGeneratorMock();

  const usecase = new CreateUserUseCase(encrypter, repository, tokenGenerator);

  return {
    usecase,
    encrypter,
    repository,
    tokenGenerator
  }
}

describe('CreateUserUseCase', () => {
  describe('Given a valid user', () => {
    it('should call encrypter hash', async () => {
      const { encrypter, usecase } = makeSut();

      await usecase.execute(validUser);

      expect(encrypter.hash).toHaveBeenCalledTimes(1);
    })

    it('should call repository create', async () => {
      const { repository, usecase } = makeSut();

      await usecase.execute(validUser);

      expect(repository.create).toHaveBeenCalledTimes(1);
    })

    it('should call token generator generate', async () => {
      const { tokenGenerator, usecase } = makeSut();

      await usecase.execute(validUser);

      expect(tokenGenerator.generate).toHaveBeenCalledTimes(1);
    })

    it('should return generated token', async () => {
      const { tokenGenerator, usecase } = makeSut();

      await usecase.execute(validUser);

      expect(tokenGenerator.generate).toHaveBeenCalledTimes(1);
    })
  })
})