import { UUID } from "crypto";

interface ITokenPayload {
  sub: UUID,
  username: string,
  roles: string[]
};

export { ITokenPayload }