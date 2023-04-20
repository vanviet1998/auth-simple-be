import { MyLogger } from "./../logger";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
class LogsMiddleware implements NestMiddleware {
	private readonly logger = new MyLogger("HTTP");

	use(request: Request, response: Response, next: NextFunction) {
		response.on("finish", () => {
			const { method, originalUrl } = request;
			const { statusCode, statusMessage } = response;
			const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;
			const payload = {
				body: JSON.stringify(request.body || {}),
				params: JSON.stringify(request.params || {}),
				query: JSON.stringify(request.query || {}),
				// files: JSON.stringify(request.files || {}),
				// file: JSON.stringify(request.file || {})
			};
			this.logger.debug(message);
			this.logger.debug(`request with payload ${JSON.stringify(payload)}`);
			if (statusCode >= 500) {
				return this.logger.error(message);
			}

			if (statusCode >= 400) {
				return this.logger.error(message);
			}

			return this.logger.debug(message);
		});
		next();
	}
}

export default LogsMiddleware;
