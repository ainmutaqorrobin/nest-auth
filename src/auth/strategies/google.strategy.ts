import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleOauthConfig from '../config/google-oauth.config';
import type { ConfigType } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleOauthConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: googleConfiguration.clientID as string,
      clientSecret: googleConfiguration.clientSecret as string,
      callbackURL: googleConfiguration.callbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const email = profile.emails?.[0]?.value;
    const avatarUrl = profile.photos?.[0]?.value;
    const firstName = profile.name?.givenName ?? '';
    const lastName = profile.name?.familyName ?? '';

    if (!email) {
      return done(
        new UnauthorizedException('Google account has no email'),
        false,
      );
    }

    const user = await this.authService.validateGoogleUser({
      email,
      firstName,
      lastName,
      avatarUrl,
      password: '',
    });

    done(null, user);
  }
}
