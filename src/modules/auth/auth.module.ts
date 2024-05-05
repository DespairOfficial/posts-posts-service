import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { accessTokenOptions } from '../../config/jwtOptions';
@Module({
  imports: [
    JwtModule.register({
      secret: accessTokenOptions.secret,
      signOptions: { expiresIn: accessTokenOptions.expiresIn },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [JwtModule],
})
export class AuthModule {}
