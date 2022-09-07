import { Email } from "./Email"

describe('Email', () => {
  describe('Given invalid email', () => {
    it('should throw INVALID_EMAIL', () => {
      expect(() => {
        new Email('invalid-email');
      }).toThrow('INVALID_EMAIL')
    })
  })

  describe('Given valid email', () => {
    it('should provide the email with getEmail', () => {
      const email = new Email('valid@email.com');

      expect(email.getEmail()).toBe('valid@email.com')
    })
  })
})