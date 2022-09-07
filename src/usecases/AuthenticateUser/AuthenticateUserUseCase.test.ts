import { UserToBeAuthenticatedDTO } from "../../entities/UserToBeAuthenticated";
import { AuthenticateUserRepository, AuthenticateUserUseCase, AuthenticateUserEncrypter, AuthenticateUserTokenGenerator } from "./AuthenticateUserUseCase";

const validUser: UserToBeAuthenticatedDTO = {
  email: 'valid@email.com',
  password: 'valid-password'
}

class RepositoryMock implements AuthenticateUserRepository {
  foundUser = true
  getUserByEmail = jest.fn(() => Promise.resolve(
    this.foundUser ? validUser : null
  ));
}

class EncrypterMock implements AuthenticateUserEncrypter {
  correctPassword = true
  compare = jest.fn(() => Promise.resolve(this.correctPassword));
}

class TokenGeneratorMock implements AuthenticateUserTokenGenerator {
  generatedToken = 'any-token'
  generate = jest.fn(() => this.generatedToken);
}

const makeSut = () => {
  const repository = new RepositoryMock();
  const encrypter = new EncrypterMock();
  const tokenGenerator = new TokenGeneratorMock();
  const usecase = new AuthenticateUserUseCase(repository, encrypter, tokenGenerator);

  return {
    usecase,
    tokenGenerator,
    encrypter,
    repository
  }
}

describe('AuthenticateUserUseCase', () => {
  describe('Given a valid user fields', () => {
    it('should call repository getUserByEmail', async () => {
      const { usecase, repository } = makeSut();

      await usecase.execute(validUser);

      expect(repository.getUserByEmail).toHaveBeenCalledTimes(1)
    })
  })

  describe('Given user not found by email', () => {
    it('should throw INVALID_AUTHENTICATION', () => {
      const { usecase, repository } = makeSut();
      repository.foundUser = false;

      
      expect(async () => {
        await usecase.execute(validUser)
      }).rejects.toThrow('INVALID_AUTHENTICATION')
    })
  })

  describe('Given user found by email', () => {
    it('should call encrypter compare', async () => {
      const { usecase, encrypter } = makeSut();

      await usecase.execute(validUser);

      expect(encrypter.compare).toHaveBeenCalledTimes(1)
    })
  })

  describe('Given wrong password', () => {
    it('should throw INVALID_AUTHENTICATION error', async () => {
      const { usecase, encrypter } = makeSut();
      encrypter.correctPassword = false;

      expect(async () => {
        await usecase.execute(validUser)
      }).rejects.toThrow('INVALID_AUTHENTICATION')
    })
  })

  describe('Given correct password', () => {
    it('should call tokenGenerator generate', async () => {
      const { usecase, tokenGenerator } = makeSut();

      await usecase.execute(validUser);

      expect(tokenGenerator.generate).toHaveBeenCalledTimes(1);
    })

    it('should return generated token', async () => {
      const { usecase, tokenGenerator } = makeSut();

      const { token } = await usecase.execute(validUser);

      expect(token).toBe(tokenGenerator.generatedToken);
    })
  })
})