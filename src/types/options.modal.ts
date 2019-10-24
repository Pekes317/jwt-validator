import { VerifyOptions } from 'jsonwebtoken';

export interface Options {
  readonly jwksUri: string;
  readonly jwt: string;
  readonly verifyOptions: VerifyOptions;
}

export default Options;
