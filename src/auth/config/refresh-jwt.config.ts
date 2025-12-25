import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

if (!process.env.REFRESH_JWT_SECRET) {
  throw new Error('REFRESH_JWT_SECRET is missing');
}
if (!process.env.REFRESH_JWT_EXPIRE_IN) {
  throw new Error('REFRESH_JWT_EXPIRE_IN is missing');
}

export default registerAs(
  'refresh-jwt',
  (): JwtSignOptions => ({
    secret: process.env.REFRESH_JWT_SECRET,
    expiresIn: process.env.REFRESH_JWT_EXPIRE_IN as any,
  }),
);
