interface UserParams {
  email: string,
  name: string,
  password: string
}

export class User {
  static PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  static EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  private email: string;
  private name: string;
  private password: string;

  constructor(params: UserParams) {
    this.validateEmail(params.email);
    this.validatePassword(params.password);
    this.validateName(params.name)

    this.email = params.email;
    this.password = params.password;
    this.name = params.name;
  }

  private validateEmail(email: string) {
    const isValid = User.EMAIL_REGEX.test(email);

    if(!isValid) {
      throw new Error('INVALID_EMAIL')
    }
  }

  private validatePassword(password: string) {
    const isValid = User.PASSWORD_REGEX.test(password);

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
}