import { UserToBeCreated, UserToBeCreatedEncrypter } from "./UserToBeCreated"

class EncrypterMock implements UserToBeCreatedEncrypter {
  hash = jest.fn()
}

describe('UserToCreate', () => {
  describe('Given an invalid email', () => {
    it('should throw INVALID_EMAIL error', () => {
      expect(() => {
        new UserToBeCreated({
          email: 'invalid-email',
          name: 'any-name',
          password: 'any-password'
        }, new EncrypterMock())
      }).toThrow('INVALID_EMAIL')
    })
  })

  describe('Given an invalid password', () => {
    it('should throw INVALID_PASSWORD error', () => {
      expect(() => {
        new UserToBeCreated({
          email: 'any@email.com',
          name: 'any-name',
          password: 'invalid'
        }, new EncrypterMock())
      }).toThrow('INVALID_PASSWORD')
    })
  })

  describe('Given a bellow min length name', () => {
    it('should throw NAME_LENGTH_BELLOW_MIN error', () => {
      expect(() => {
        new UserToBeCreated({
          email: 'any@email.com',
          name: 'a',
          password: '1234567a'
        }, new EncrypterMock())
      }).toThrow('NAME_LENGTH_BELLOW_MIN')
    })
  })

  describe('Given a above max length name', () => {
    it('should throw NAME_LENGTH_ABOVE_MAX error', () => {
      expect(() => {
        new UserToBeCreated({
          email: 'any@email.com',
          name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          password: '1234567a'
        }, new EncrypterMock())
      }).toThrow('NAME_LENGTH_ABOVE_MAX')
    })
  })
})