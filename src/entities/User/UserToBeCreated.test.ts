import { UserToBeCreated, UserToBeCreatedEncrypter } from "./UserToBeCreated"

describe('UserToCreate', () => {
  describe('Given a bellow min length name', () => {
    it('should throw NAME_LENGTH_BELLOW_MIN error', () => {
      expect(() => {
        new UserToBeCreated({
          email: 'any@email.com',
          name: 'a',
          password: '1234567a'
        })
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
        })
      }).toThrow('NAME_LENGTH_ABOVE_MAX')
    })
  })
})