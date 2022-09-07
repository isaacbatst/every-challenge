import { NextApiResponse } from "next";
import { AuthenticationError } from "../errors/AuthenticationError";
import { BadEntityError } from "../errors/BadEntityError";
import { ConflictError } from "../errors/ConflictError";
import { ValidationError } from "../errors/ValidationError";

export class ApiErrorHandler {
  static handle(err: unknown, res: NextApiResponse) {
    if(err instanceof ValidationError) {
      return res.status(400).json({ error: err.message })
    }

    if(err instanceof BadEntityError) {
      return res.status(422).json({ error: err.message })
    }

    if(err instanceof AuthenticationError) {
      return res.status(401).json({ error: err.message })
    }

    if(err instanceof ConflictError) {
      return res.status(409).json({ error: err.message })
    }

    console.error(err)
    return res.status(500).end();
  }
}