import { NextApiResponse } from "next";
import { AuthenticationError } from "../errors/AuthenticationError";
import { AuthorizationError } from "../errors/AuthorizationError";
import { BadEntityError } from "../errors/BadEntityError";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { ValidationError } from "../errors/ValidationError";

export class ApiErrorHandler {
  static errorToCode: Record<string, number> = {
    ValidationError: 400,
    BadEntityError: 422,
    AuthenticationError: 401,
    ConflictError: 409,
    NotFoundError: 404,
    AuthorizationError: 403,
  }

  static handle(err: unknown, res: NextApiResponse) {
    if(err instanceof Error) {
      const code = this.errorToCode[err.name];
    
      if(this.errorToCode[err.name]) {
        return res.status(code).json({ error: err.message })
      }
    }

    console.error(err)
    return res.status(500).end();
  }
}