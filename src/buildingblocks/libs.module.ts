import { Module } from "@nestjs/common";
import { PasswordEncoderService } from "./authorization/password-encoder.service";
import { JwtModule } from "@nestjs/jwt";
import { TokenService } from "./authorization/token.service";
import { AuthGuard } from "./authorization/auth.guard";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      verifyOptions: {
        issuer: process.env.JWT_ISSUER,
      },
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATIONTIME ?? '3600s',
        issuer: process.env.JWT_ISSUER,
      },
    }),
  ],
  providers: [
    PasswordEncoderService,
    TokenService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
  exports: [
    PasswordEncoderService,
    TokenService,
  ],
})
export class LibsModule { }