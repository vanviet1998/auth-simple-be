import { plainToClass } from 'class-transformer';
import { Injectable, Logger } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

export class Environment {
  @Expose()
  @IsString()
  public SALT!: string;

  @Expose()
  @IsString()
  public SECRET!: string;
}

@Injectable()
export class EnvironmentService {
  protected logger = new Logger(Environment.name);
  public readonly ENVIROMENT: Environment;
  constructor() {
    this.ENVIROMENT = plainToClass(
      Environment,
      {
        ...new Environment(),
        ...process.env,
      },
      { excludeExtraneousValues: true },
    );
    const resCheckEnv = validateSync(this.ENVIROMENT);
    if (resCheckEnv.length) {
      this.logger.error(resCheckEnv);
      throw resCheckEnv;
    }
  }
}

