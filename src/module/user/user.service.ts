import {
  CreateUserPayloadDto,
  CreateUserReponseDto,
  LoginPayloadDto,
  UserEntity,
} from "@internal/shared/dto/user/user.dto";
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BAD_REQUEST_MESSAGE } from 'src/common/enum';
import { guidGenerator, readUserToJSon, writeUserToJSon } from "src/helper";
import { EnvironmentService } from "src/environment/environment.service";

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(
    private readonly environment: EnvironmentService,
  ) { }

  async create(
    createUserDto: CreateUserPayloadDto,
  ): Promise<CreateUserReponseDto> {
    const { username, password } = createUserDto;
    const allUser =  readUserToJSon();
    const userExit = (allUser).find(user => user.username === username)
    if (userExit?._id) {
      this.logger.debug(userExit)
      throw new BadRequestException(BAD_REQUEST_MESSAGE.USER_HAS_EXIT);
    }

    const hasPassword = await bcrypt.hash(
      password,
      +this.environment.ENVIROMENT.SALT,
    );
    const newUser = {
      ...createUserDto,
      password: hasPassword,
      _id: guidGenerator()
    };

    await writeUserToJSon(newUser);
    return {
      success: true,
    };
  }

  async login(payload: LoginPayloadDto): Promise<UserEntity> {
    try {
      const { username, password } = payload;
      const allUser =  readUserToJSon();
      const userExit = allUser.find(user => user.username === username)
      if (!userExit?._id) {
        throw new BadRequestException(BAD_REQUEST_MESSAGE.USER_NAME_NOT_EXIT);
      }
      const isPasswordMatching = await bcrypt.compare(
        password,
        userExit.password,
      );
      if (!isPasswordMatching)
        throw new BadRequestException(BAD_REQUEST_MESSAGE.PASSWORD_INVALID);
      return userExit;
    } catch (error) {
    }
  }
}
