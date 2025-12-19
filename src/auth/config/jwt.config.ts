import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is missing');
}
if (!process.env.JWT_EXPIRE_IN) {
  throw new Error('JWT_EXPIRE_IN is missing');
}

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRE_IN as any },
  }),
);
