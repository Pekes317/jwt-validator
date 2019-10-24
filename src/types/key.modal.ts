export interface Key {
  readonly kty: string;
  readonly use: string;
  readonly kid: string;
  readonly x5t: string;
  readonly n: string;
  readonly e: string;
  readonly x5c: readonly string[];
  readonly issuer: string;
}

export default Key;
