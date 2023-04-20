import { LoginReponseDto } from '@internal/shared/dto/user/user.dto';
import { plainToClass } from 'class-transformer';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { EnvironmentService } from 'src/environment/environment.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(public readonly env: EnvironmentService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.ENVIROMENT.SECRET,
    });
  }

  async validate(payload: any): Promise<LoginReponseDto> {
    return plainToClass(LoginReponseDto, {
      ...payload,
      userId: payload.sub,
      username: payload.username,
    });
  }
}
