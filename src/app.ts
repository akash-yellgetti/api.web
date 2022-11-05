import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import morganLogger from 'morgan';
import path from 'path';
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import route from "./route/index.route";

class App {
  private app: express.Application;
  private static instance: App;

  constructor() {
    this.app = express();
    this.listen();
    this.processError();
    this.initialize();
    this.cors();
  }

  // tslint:disable-next-line
  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }

    return App.instance;
  }

  /**
  * As the name suggest loads all required setting for the express app
  */
  private initialize = () => {
    // Printing the api calls
    this.app.use(morganLogger('dev'));
    // for parsing application/raw
    this.app.use(bodyParser.raw({ limit: '50MB' }));
    // for parsing application/json
    this.app.use(bodyParser.json({ limit: '50MB' }));
    // for parsing application/xwww-form-urlencoded
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
    // For api config
    this.app.get('/ping', this.ping);
    // Configure route
    this.app.use(route);
  }

  private cors = () => {
    const options: cors.CorsOptions = {
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: '*',
      preflightContinue: false,
    };
    this.app.use(cors());
  }
 
  private listen = () => {
    this.app.listen(config.get("port"), () => {
      log.info(`| Name : ${config.get("program")} | Mode : ${config.get("mode")} | Version : ${config.get("version")} | Port : ${config.get("port")} |`);
    });
  }

  private ping = (req: any, res: any) => {
    const result = {
      project: 'Welcome to Momenta ' + config.get("program"),
      mode : config.get("mode"),
      dateTime: new Date(new Date().toUTCString()),
      version: config.get("version"),
    };
    return res.status(200).json(result);
  }

  private processError = () => {
    this.app.use((err: any, req: any, res: any, next: any) => {
      if (err instanceof Error) {
        log.error(JSON.stringify({ level: 'error', message: `${err.stack || err}` }));
      } else {
        log.error(JSON.stringify({ level: 'error', message: err }));
      }
      return res.json(err).status(err.status || 500);
    });
    const infoObject: any = {
      type: 'server',
      program: config.get("program"),
      mode: config.get("mode"),
      timestamp: new Date(),
    };
    process
      .on('unhandledRejection', (reason: any, p) => {
        infoObject.message = 'Promise unhandled rejection';
        infoObject.data = JSON.stringify({
          p,
          reason: reason.stack || reason,
        });
        log.info(infoObject);
      })
      .on('uncaughtException', (err) => {
        infoObject.message = 'Process uncaught exception';
        infoObject.data = JSON.stringify({
          reason: err.stack || err,
        }),
        log.info(infoObject);
      });
  }
}


export default new App();