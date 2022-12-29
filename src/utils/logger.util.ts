import pinoLogger from "pino";
import dayjs from "dayjs";
import winston from 'winston';
import winstonMongodb from 'winston-mongodb';
// const winston = require('winston');


export const logs = pinoLogger({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      // timestamp: () => `,"time":"${dayjs().format()}"`,
    }
  }
});



const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red',
  },
};

const formatter = winston.format.combine(
  // winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MMM-DD HH:mm:ss' }),
  // winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;

    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
      }`;
  }),
);

class Logger {
  private logger: winston.Logger;

  constructor() {
    const prodTransport = new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    });
    const transportFile = new winston.transports.File({
      filename: 'logs.log',
      format: formatter,
    });

    const transportConsole = new winston.transports.Console({
      format: formatter,
    });

    // const transportMongoDB = new winston.transports.MongoDB({
    //   db: 'mongodb://admin:passw0rd1@194.195.116.219/app?authSource=admin',
    //   collection: 'logs'
    // });

    this.logger = winston.createLogger({
      transports: [
        transportFile,
        transportConsole
      ],
    });
  }

  trace(msg: any, meta?: any) {
    this.logger.log('trace', msg, meta);
  }

  debug(msg: any, meta?: any) {
    this.logger.debug(msg, meta);
  }

  info(msg: any, meta?: any) {
    this.logger.info(msg, meta);
  }

  warn(msg: any, meta?: any) {
    this.logger.warn(msg, meta);
  }

  error(msg: any, meta?: any) {
    this.logger.error(msg, meta);
  }

  fatal(msg: any, meta?: any) {
    this.logger.log('fatal', msg, meta);
  }
}

export const log = new Logger();