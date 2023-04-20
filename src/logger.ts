import { LoggerService } from '@nestjs/common';
import { pino } from 'pino';
const { colorizerFactory } = require('pino-pretty')
const levelColorize = colorizerFactory(true)
const levelPrettifier = logLevel => ` ${levelColorize(logLevel)}`



const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: true,
   
    },

  },
  prettyPrint:{
    levelFirst: true,
    customPrettifiers:{
      level: levelPrettifier,
      time: timestamp => `${new Date(+timestamp.toString()).toLocaleString('vi-VN', { timeZone: "Asia/Ho_Chi_Minh" })}`,
    }

  },
  level: 'trace',
});

export class MyLogger implements LoggerService {
  constructor(private context: string) {}
  /**
   * Write a 'log' level log.
   */
  log(message: any, context?: string | undefined) {
    logger.trace({}, `[${this.context}]:` + (context || '')+ ": " + message);
  }

  /**
   * Write an 'error' level log.
   */
  error(
    message: any,
    trace?: string | undefined,
    context?: string | undefined,
  ) {
    console.log(message);
    logger.error(
      `[${this.context}]:` + (context || '') + ": " + message + '------' + trace,
    );
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, context?: string | undefined) {
    logger.warn(`[${this.context}]:` + (context || '') + message);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, context?: string | undefined) {
    logger.debug(`[${this.context}]:` + (context || '') + message);
  }

  /**
   * Write a 'verbose' level log.
   */
}
