import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import morganLogger from 'morgan';
import path from 'path';
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import route from "./routes";

class App {
  private app: express.Application;
  private static instance: App;

  constructor() {
    this.app = express();
    this.listen();
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
      dateTime: new Date(new Date().toUTCString()),
      version: config.get("version"),
    };
    return res.status(200).json(result);
  }
}


export default new App();