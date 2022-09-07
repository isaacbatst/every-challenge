import 'dotenv/config'

import { TokenGenerator } from "../interfaces/TokenGenerator";
import { TokenPayload } from "../interfaces/TokenPayload";
import jwt from 'jsonwebtoken'

export class JwtTokenGenerator implements TokenGenerator {
  generate(payload: TokenPayload): string {
    if(!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET_NOT_DEFINED')
    }

    return jwt.sign(payload, process.env.JWT_SECRET);
  }
}