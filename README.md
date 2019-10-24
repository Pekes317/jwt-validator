# JWT-Validator

A Lightweight JWT Validator for use with AWS Lambda@Edge. This package is an effort to trim down the `jwks-rsa` package that when bundled with its dependencies is larger then the 1MB limit set on AWS Lambda@Edge user the Viewer Reponse or Viewer Request positions. There is some borrowed logic from `jwks-rsa` and I would like to praise this package. I would also encourage the use of `jwks-rsa` for other use cases where the 1MB limit doesn't apply since it s a far more robust package for this work.

https://www.npmjs.com/package/jwks-rsa
