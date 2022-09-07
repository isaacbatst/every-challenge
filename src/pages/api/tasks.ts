import { NextApiHandler } from "next";
import { ApiErrorHandler } from "../../application/ApiErrorHandler";
import { CookiesManager } from "../../application/CookiesManager";
import { JwtTokenHandler } from "../../application/JwtTokenGenerator";
import { AuthenticationError } from "../../errors/AuthenticationError";
import { ValidationError } from "../../errors/ValidationError";
import { PrismaTaskRepository } from "../../infra/repositories/PrismaTaskRepository";
import { CreateTaskUseCase } from "../../usecases/CreateTask/CreateTaskUseCase";
import { GetMyTasksUseCase } from "../../usecases/GetMyTasks/GetMyTasksUseCase";

const handler: NextApiHandler = async (req, res) => {
  try {
    if(req.method === 'POST'){
      await handleCreateTask(req, res);
      return;
    }
  
    if(req.method === 'GET') {
      await handleGetMyTasks(req, res);
      return;
    }

    return res.status(405).end();
  } catch (err) {
    ApiErrorHandler.handle(err, res);
  }
}

const handleGetMyTasks: NextApiHandler = async (req, res) => {
  const tokenDecoder = new JwtTokenHandler();
  const repository = new PrismaTaskRepository();

  const usecase = new GetMyTasksUseCase(tokenDecoder, repository);

  const token = CookiesManager.getToken(req, res);
  
  if(!token) {
    throw new AuthenticationError('TOKEN_NOT_FOUND');
  }

  const tasks = await usecase.execute({
    token
  });

  return res.status(200).json(tasks)
}

const handleCreateTask: NextApiHandler = async (req, res) => {
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
}

export default handler;