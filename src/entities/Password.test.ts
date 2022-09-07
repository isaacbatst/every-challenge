import { Password } from "./Password";

describe('Password', () => {
  describe('Given invalid password', () => {
    it('should throw INVALID_PASSWORD', () => {
      expect(() => {
        new Password('invalid');
      }).toThrow('INVALID_PASSWORD')
    })
  })

  describe('Given valid password', () => {
    it('should provide the password with getPassword', () => {
      const password = new Password('valid-password');

      expect(password.getPassword()).toBe('valid-password')
    })
  })
})