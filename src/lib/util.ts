export const certToPEM = (certStub: string) => {
  const match = certStub.match(/.{1,64}/g);
  const certSet = match && match.join('\n');
  const cert = `-----BEGIN CERTIFICATE-----\n${certSet}\n-----END CERTIFICATE-----\n`;

  return cert;
};
