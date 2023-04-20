import { UserService } from '../user/user.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/shared/dto/user/user.dto';

@Injectable()
export class AuthenticationStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(UserService.name);
  constructor(private userSerive: UserService, private jwtService: JwtService) {
    super();
  }
  async validate(username: string, password: string): Promise<UserEntity> {
    return this.userSerive.login({ username, password });
  }
  async login(user: UserEntity) {
    this.logger.debug('[User infor]: ' + JSON.stringify(user));
    const payload = {
      username: user.username,
      sub: user._id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      username:user.username,
    };
  }
}
