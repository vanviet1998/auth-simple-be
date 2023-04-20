import { AuthenticationModule } from "./module/authentication/authentication.module";
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./module/user/user.module";
import LogsMiddleware from "./middleware/logs.middleware";
import { AppService } from "./app.service";


@Module({
	imports: [
		ConfigModule.forRoot(),
		UserModule,
		AuthenticationModule,
		
	],
	controllers: [AppController],
	providers:[AppService]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LogsMiddleware)
			.forRoutes("*");
	}
}
