import { ValidationError } from "../../../errors/ValidationError";

export class Email {
  static EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  private address: string;

  constructor(address: string) {
    this.validateAddress(address);
    this.address = address;
  }

  private validateAddress(address: string) {
    const isValid = Email.EMAIL_REGEX.test(address);

    if(!isValid) {
      throw new ValidationError('INVALID_EMAIL')
    }
  }

  getEmail(): string {
    return this.address;
  }
}