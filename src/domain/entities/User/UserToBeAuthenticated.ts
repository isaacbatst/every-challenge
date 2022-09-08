import { Email } from "./Email";
import { Password } from "./Password";

export interface UserToBeAuthenticatedDTO {
  email: string;
  password: string
}

export class UserToBeAuthenticated {
  private email: Email;
  private password: Password;

  constructor(params: UserToBeAuthenticatedDTO){
    this.email = new Email(params.email);
    this.password = new Password(params.password);
  }
 
  getPassword(): string {
    return this.password.getPassword();
  }

  getEmail(): string {
    return this.email.getEmail();
  }
}