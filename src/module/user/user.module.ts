import { Module } from '@nestjs/common';
import { EnviromentModule } from 'src/environment/evironment.module';
import { UserService } from './user.service';


@Module({
  imports: [EnviromentModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
