import { AuthenticationController } from './authentication.controller';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationStrategy } from './authentication.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/module/user/user.module';
import { EnviromentModule } from 'src/environment/evironment.module';
import { EnvironmentService } from 'src/environment/environment.service';

@Module({
  imports: [
    PassportModule,
    UserModule,
    EnviromentModule,
    JwtModule.registerAsync({
      imports: [EnviromentModule],
      useFactory(envService: EnvironmentService) {
        return {
          secret: envService.ENVIROMENT.SECRET,
          signOptions: { expiresIn: '7d' },
        };
      },
      inject: [EnvironmentService],
    }),
  ],
  providers: [AuthenticationStrategy, JwtStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
