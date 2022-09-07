import { NextApiHandler } from "next";
import { ApiErrorHandler } from "../../application/ApiErrorHandler";
import { CookiesManager } from "../../application/CookiesManager";
import { JwtTokenHandler } from "../../application/JwtTokenGenerator";
import { AuthenticationError } from "../../errors/AuthenticationError";
import { ValidationError } from "../../errors/ValidationError";
import { PrismaTaskRepository } from "../../infra/repositories/PrismaTaskRepository";
import { CreateTaskUseCase } from "../../usecases/CreateTask/CreateTaskUseCase";

const handler: NextApiHandler = (req, res) => {
  if(req.method === 'POST'){
    return handleCreateTask(req, res)
  }
}

const handleCreateTask: NextApiHandler = async (req, res) => {
  try {
    const tokenDecoder = new JwtTokenHandler();
    const repository = new PrismaTaskRepository();
    const usecase = new CreateTaskUseCase(repository, tokenDecoder);

    const token = CookiesManager.getToken(req, res);

    if(!token) {
      throw new AuthenticationError('TOKEN_NOT_FOUND');
    }

    const { description, status, title } = req.body as Record<string, unknown>;

    if(!title || typeof title !== 'string'){
      throw new ValidationError('INVALID_TITLE');
    }

    if(!description || typeof description !== 'string'){
      throw new ValidationError('INVALID_DESCRIPTION');
    }

    if(!status || typeof status !== 'string'){
      throw new ValidationError('INVALID_STATUS');
    }

    await usecase.execute({
      description,
      status,
      title,
      token
    });

    return res.status(201).end();
  } catch (err) {
    return ApiErrorHandler.handle(err, res)
  }
}

export default handler;