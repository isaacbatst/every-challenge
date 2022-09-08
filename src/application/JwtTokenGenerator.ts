import 'dotenv/config'

import { TokenGenerator } from "../domain/interfaces/TokenGenerator";
import { TokenPayload } from "../domain/interfaces/TokenPayload";
import jwt from 'jsonwebtoken'
import { TokenDecoder } from '../domain/interfaces/TokenDecoder';
import { AuthenticationError } from '../errors/AuthenticationError';

export class JwtTokenHandler implements TokenGenerator, TokenDecoder {
  private secret: string
  
  constructor() {
    if(!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET_NOT_DEFINED')
    }

    this.secret = process.env.JWT_SECRET
  }

  generate(payload: TokenPayload): string {

    return jwt.sign(payload, this.secret);
  }

  decode(token: string): TokenPayload {
    const decoded = this.verifyToken(token);

    if(typeof decoded === 'string' || !('id' in decoded)) {
      throw new AuthenticationError('UNEXPECTED_JWT_PAYLOAD_FORMAT');
    }

    return decoded as TokenPayload;
  }

  private verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.secret);
      return decoded;
    } catch (err) {
      throw new AuthenticationError('INVALID_TOKEN')
    }
  } 
}