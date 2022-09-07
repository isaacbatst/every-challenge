export class Password {
  private password: string;

  constructor(
    password: string
  ) {
    this.validatePassword(password)
    this.password = password
  }

  private validatePassword(password: string) {
    const isValid = password.length >= 8;

    if(!isValid) {
      throw new Error('INVALID_PASSWORD')
    }
  }

  getPassword(): string {
    return this.password;
  }
}