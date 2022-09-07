import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";

export class CookiesManager {
  private static AUTHORIZATION_NAME = 'Every-todo-app-Authorization';

  private static SECONDS_IN_A_DAY =  24 * 60 * 60;
  private static EXPIRATION_TIME = this.SECONDS_IN_A_DAY;

  private static getAuthorizationName() {
    return CookiesManager.AUTHORIZATION_NAME;
  }

  private static getExpirationTime() {
    return CookiesManager.EXPIRATION_TIME;
  }

  static setToken = (req: NextApiRequest, res: NextApiResponse, token: string) => {
    const cookies = new Cookies(req, res);
      
    const authorizationName = CookiesManager.getAuthorizationName();
  
    cookies.set(authorizationName, token, {
      maxAge: CookiesManager.getExpirationTime()
    });
  }
  
}