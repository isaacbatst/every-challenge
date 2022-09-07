import { NextApiHandler } from "next";
import { ApiErrorHandler } from "../../application/ApiErrorHandler";
import { BcrypEncrypter } from "../../application/BcryptEncrypter";
import { CookiesManager } from "../../application/CookiesManager";
import { JwtTokenHandler } from "../../application/JwtTokenGenerator";
import { ValidationError } from "../../errors/ValidationError";
import { PrismaUserRepository } from "../../infra/repositories/PrismaUserRepository";
import { AuthenticateUserUseCase } from "../../usecases/AuthenticateUser/AuthenticateUserUseCase";

const handler: NextApiHandler = async (req, res) => {
  try {
    if(req.method === 'POST'){
      await handleAuth(req, res);
      return;
    }
  
    return res.status(405).end();
  } catch (err) {
    return ApiErrorHandler.handle(err, res)
  }
}

const handleAuth: NextApiHandler = async (req, res) => {
  const tokenGenerator = new JwtTokenHandler();
  const encrypter = new BcrypEncrypter();
  const repository = new PrismaUserRepository();
  const usecase = new AuthenticateUserUseCase(repository, encrypter, tokenGenerator);

  const { email, password } = req.body as Record<string, unknown>;

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
  
  return res.status(200).end();

}

export default handler;