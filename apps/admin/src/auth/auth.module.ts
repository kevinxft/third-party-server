import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ResourceModule } from '../resource/resource.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
const { secret, expiresIn } = jwtConstants;

@Module({
  imports: [
    ResourceModule,
    JwtModule.register({
      global: true,
      secret,
      signOptions: { expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
