export class CookiesManager {
  private static AUTHORIZATION_NAME = 'Every-todo-app-Authorization';

  private static SECONDS_IN_A_DAY =  24 * 60 * 60;
  private static EXPIRATION_TIME = this.SECONDS_IN_A_DAY;

  static getAuthorizationName() {
    return CookiesManager.AUTHORIZATION_NAME;
  }

  static getExpirationTime() {
    return CookiesManager.EXPIRATION_TIME;
  }
}