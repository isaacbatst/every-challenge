import Cookies from "cookies";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ApiErrorHandler } from "../../application/ApiErrorHandler";
import { BcrypEncrypter } from "../../application/BcryptEncrypter";
import { CookiesManager } from "../../application/CookiesManager";
import { JwtTokenGenerator } from "../../application/JwtTokenGenerator";
import { ValidationError } from "../../errors/ValidationError";
import { PrismaUserRepository } from "../../infra/repositories/PrismaUserRepository";
import { CreateUserUseCase } from "../../usecases/CreateUser/CreateUserUseCase";

const handler: NextApiHandler = async (req: NextApiRequest, res) => {
  try {
    const repository = new PrismaUserRepository();
    const encrypter = new BcrypEncrypter();
    const tokenGenerator = new JwtTokenGenerator();

    const usecase = new CreateUserUseCase(encrypter, repository, tokenGenerator);

    const { email, name, password } = req.body as Record<string, unknown>;

    if(!email || typeof email !== 'string'){
      throw new ValidationError('INVALID_EMAIL');
    }

    if(!name || typeof name !== 'string') {
      throw new ValidationError('INVALID_NAME')
    }

    if(!password || typeof password !== 'string') {
      throw new ValidationError('INVALID_PASSWORD')
    }

    const { token } = await usecase.execute({
      email,
      name,
      password
    });
    
    setTokenToCookies(req, res, token);

    // but it has been already set on http only cookie
    // returning token here to ease testing via apps like insomnia/postman
    return res.status(201).json({ token })
  } catch (err) {
    return ApiErrorHandler.handle(err, res)
  }
}

const setTokenToCookies = (req: NextApiRequest, res: NextApiResponse, token: string) => {
  const cookies = new Cookies(req, res);
    
  const authorizationName = CookiesManager.getAuthorizationName();

  cookies.set(authorizationName, token, {
    maxAge: CookiesManager.getExpirationTime()
  });

}

export default handler;