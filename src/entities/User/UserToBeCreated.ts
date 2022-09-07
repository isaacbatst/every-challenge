import { Email } from "./Email";
import { Password } from "./Password";

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
    const email =  new Email(params.email);
    const password = new Password(params.password);
    this.validateName(params.name)

    const hash = encrypter.hash(password.getPassword());

    this.email = email;
    this.password = hash;
    this.name = params.name;
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
    return this.email.getEmail();
  }

  getName(): string {
    return this.name
  }

  getPassword(): string {
    return this.password;
  }
}