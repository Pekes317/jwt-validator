import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

import { Key } from '../types/key.modal';
import { Options } from '../types/options.modal';
import { Logger } from './logger';
import { certToPEM } from './util';

export const JwtValidator = (options: Options) => {
  const opts = options;

  return {
    getKey: async () => {
      const token = jwt.decode(opts.jwt, { complete: true });
      const header = token && typeof token === 'object' && token.header;
      const res = await fetch(opts.jwksUri).catch(err =>
        Logger.error('Was not able to get keys', err)
      );
      const rsaKeys = res && (await res.json());
      const keys = rsaKeys && (rsaKeys.key as readonly Key[]);

      const signingKey = keys.find(key => key.kid === header.kid);
      const cert = signingKey && signingKey.x5c[0];
      const publicKey = cert ? certToPEM(cert) : '';

      return publicKey;
    },
    verifyToken: async () => {
      const publicSecret = await JwtValidator(opts).getKey();

      return new Promise((resolve, reject) => {
        jwt.verify(
          opts.jwt,
          publicSecret,
          opts.verifyOptions,
          (err, decoded) => {
            // tslint:disable-next-line: no-if-statement
            if (err) {
              // tslint:disable-next-line: no-expression-statement
              Logger.error('Validation Failed', err);
              // tslint:disable-next-line: no-expression-statement
              reject(err);
            }

            // tslint:disable-next-line: no-expression-statement
            resolve(decoded);
          }
        );
      });
    }
  };
};

export default JwtValidator;
