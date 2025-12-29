import { registerAs } from '@nestjs/config';

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('GOOGLE_CLIENT_ID is missing');
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_CLIENT_SECRET is missing');
}
if (!process.env.GOOGLE_CALLBACK_URL) {
  throw new Error('GOOGLE_CALLBACK_URL is missing');
}

export default registerAs('googleOAuth', () => ({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackUrl: process.env.GOOGLE_CALLBACK_URL,
}));
