import { NextApiHandler } from "next";
import { ApiErrorHandler } from "../../application/ApiErrorHandler";
import { BcrypEncrypter } from "../../application/BcryptEncrypter";
import { CookiesManager } from "../../application/CookiesManager";
import { JwtTokenGenerator } from "../../application/JwtTokenGenerator";
import { ValidationError } from "../../errors/ValidationError";
import { PrismaUserRepository } from "../../infra/repositories/PrismaUserRepository";
import { AuthenticateUserUseCase } from "../../usecases/AuthenticateUser/AuthenticateUserUseCase";

const handler: NextApiHandler = async (req, res) => {
  if(req.method === 'POST'){
    return handleAuth(req, res);
  }

  return res.status(405).end();
}

const handleAuth: NextApiHandler = async (req, res) => {
  try {
    const tokenGenerator = new JwtTokenGenerator();
    const encrypter = new BcrypEncrypter();
    const repository = new PrismaUserRepository();
    const usecase = new AuthenticateUserUseCase(repository, encrypter, tokenGenerator);

    const { email, password } = req.body;

    if(!email || typeof email !== 'string'){
      throw new ValidationError('INVALID_EMAIL');
    }

    if(!password || typeof password !== 'string') {
      throw new ValidationError('INVALID_PASSWORD')
    }

    const { token } = await usecase.execute({
      email,
      password
    });

    CookiesManager.setToken(req, res, token);
    
    // returning token ALSO bellow to ease testing via apps like insomnia/postman
    // but it has been already set on http only cookie
    return res.status(200).json({ token })
  } catch (err) {
    ApiErrorHandler.handle(err, res)
  }
}

export default handler;