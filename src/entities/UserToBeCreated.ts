import { Email } from "./Email";

export interface UserToBeCreatedDTO {
  email: string,
  name: string,
  password: string
}

export interface UserToBeCreatedEncrypter {
  hash(value: string): string
}

export class UserToBeCreated {
  private email: Email;
  private name: string;
  private password: string;

  constructor(params: UserToBeCreatedDTO, encrypter: UserToBeCreatedEncrypter) {
    this.validatePassword(params.password);
    this.validateName(params.name)

    const hash = encrypter.hash(params.password);

    this.email = new Email(params.email);
    this.name = params.name;
    this.password = hash;
  }

  private validatePassword(password: string) {
    const isValid = password.length >= 8;

    if(!isValid) {
      throw new Error('INVALID_PASSWORD')
    }
  }

  private validateName(name: string) {
    if(name.length < 2){
      throw new Error('NAME_LENGTH_BELLOW_MIN')
    }

    if(name.length > 80) {
      throw new Error('NAME_LENGTH_ABOVE_MAX')
    }
  }

  getEmail(): string {
    return this.email.getAddress();
  }

  getName(): string {
    return this.name
  }

  getPassword(): string {
    return this.password;
  }
}