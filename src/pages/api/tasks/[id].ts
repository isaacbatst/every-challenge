import { NextApiHandler } from "next";
import { ApiErrorHandler } from "../../../application/ApiErrorHandler";
import { CookiesManager } from "../../../application/CookiesManager";
import { JwtTokenHandler } from "../../../application/JwtTokenGenerator";
import { AuthenticationError } from "../../../errors/AuthenticationError";
import { ValidationError } from "../../../errors/ValidationError";
import { PrismaTaskRepository } from "../../../infra/repositories/PrismaTaskRepository";
import { ChangeTaskStatusUseCase } from "../../../usecases/ChangeTaskStatus/ChangeTaskStatusUseCase";

const handler: NextApiHandler = async (req, res) => {
  try {
    if(req.method === 'PATCH') {
      await handlePatchTask(req, res);
      return;
    }

    return res.status(405).end();
  } catch(err) {
    return ApiErrorHandler.handle(err, res)
  }
}

const handlePatchTask: NextApiHandler = async (req, res) => {
  const tokenDecoder = new JwtTokenHandler();
  const repository = new PrismaTaskRepository();

  const usecase = new ChangeTaskStatusUseCase(tokenDecoder, repository);

  const token = CookiesManager.getToken(req, res);
  
  if(!token) {
    throw new AuthenticationError('TOKEN_NOT_FOUND');
  }

  const { id: taskId } = req.query

  if(!taskId || typeof taskId !== 'string') {
    throw new ValidationError('INVALID_TASK_ID')
  }

  const { status } = req.body as Record<string, unknown>

  if(!status || typeof status !== 'string') {
    throw new ValidationError('INVALID_STATUS')
  }

  await usecase.execute({
    status,
    taskId,
    token
  })

  return res.status(204).end();
}

export default handler;