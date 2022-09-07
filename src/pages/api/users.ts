import { NextApiHandler, NextApiRequest } from "next";
import { ApiErrorHandler } from "../../application/ApiErrorHandler";
import { BcrypEncrypter } from "../../application/BcryptEncrypter";
import { CookiesManager } from "../../application/CookiesManager";
import { JwtTokenHandler } from "../../application/JwtTokenGenerator";
import { ValidationError } from "../../errors/ValidationError";
import { PrismaUserRepository } from "../../infra/repositories/PrismaUserRepository";
import { CreateUserUseCase } from "../../usecases/CreateUser/CreateUserUseCase";

const handler: NextApiHandler = async (req: NextApiRequest, res) => {
  try {
    if(req.method === 'POST') {
      await handleCreateUser(req, res);
      return;
    }

    return res.status(405).end();
  } catch (err) {
    return ApiErrorHandler.handle(err, res)
  }
}

const handleCreateUser: NextApiHandler = async (req, res) => {
  const repository = new PrismaUserRepository();
  const encrypter = new BcrypEncrypter();
  const tokenGenerator = new JwtTokenHandler();

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
  
  CookiesManager.setToken(req, res, token);

  // returning token ALSO bellow to ease testing via apps like insomnia/postman
  // but it has been already set on http only cookie
  return res.status(201).end();
}


export default handler;