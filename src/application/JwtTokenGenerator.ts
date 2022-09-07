import 'dotenv/config'

import { TokenGenerator } from "../interfaces/TokenGenerator";
import { TokenPayload } from "../interfaces/TokenPayload";
import jwt from 'jsonwebtoken'
import { TokenDecoder } from '../interfaces/TokenDecoder';

export class JwtTokenHandler implements TokenGenerator, TokenDecoder {
  generate(payload: TokenPayload): string {
    if(!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET_NOT_DEFINED')
    }

    return jwt.sign(payload, process.env.JWT_SECRET);
  }

  decode(token: string): TokenPayload {
    if(!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET_NOT_DEFINED')
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(typeof decoded === 'string' || !('id' in decoded)) {
      throw new Error('UNEXPECTED_JWT_PAYLOAD_FORMAT');
    }

    return decoded as TokenPayload;
  }
}