import { CreateUserlDTO, CreateUserPayloadDto, LoginDTO } from '@internal/shared/dto/user/user.dto';
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../user/user.service';

import { LocalAuthenticationGuard } from 'src/module/authentication/localAuthentication.guard';
import { AuthenticationStrategy } from './authentication.strategy';


@Controller()
export class AuthenticationController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthenticationStrategy,
  ) {}

  @Post(CreateUserlDTO.url)
  create(@Body() createUserDto: CreateUserPayloadDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post(LoginDTO.url)
  login(@Request() req) {
    return this.authService.login(req.user);
  }

}
