import { TokenPayload } from "./TokenPayload";

export interface TokenGenerator {
  generate(payload: TokenPayload): string
}
