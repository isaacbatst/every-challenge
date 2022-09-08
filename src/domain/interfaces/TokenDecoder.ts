import { TokenPayload } from "./TokenPayload";

export interface TokenDecoder {
  decode(token: string): TokenPayload
}