import { MyLogger } from './logger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const appLogger = new MyLogger('BE-KH');

  const app = await NestFactory.create(AppModule, {
    logger: appLogger,
  });
  app.enableCors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (err) => {
        appLogger.error('[Validate error]:');
        appLogger.error(err);
        return new BadRequestException(err);
      },
    }),
  );
  await app.listen(process.env.PORT);
  appLogger.warn('APP START WITH PORT: ===> ' + process.env.PORT);
}
bootstrap();
