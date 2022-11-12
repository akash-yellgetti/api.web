import http from "http";
import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import mongoose from "mongoose";
import morganLogger from 'morgan';
import { Server } from "socket.io";
import { setting } from "./setting";
import { socketIO } from "../utils/socket.util";
import DB from "./db";
import log from "../logger";
import route from "../route/index.route";

class App {
  private app: express.Application;
  private server: any;
  private db: any;
  private io: any;
  private static instance: App;

  constructor() {
    const app = express();
    this.app = app;
    const server = http.createServer(app);
    if(setting && setting.socket) {
      this.io = new Server(server);
      this.io.on('connection', socketIO)
    }
    this.server = server;
    this.listen();
    this.processError();
    this.initialize();
    this.cors();
    if(setting && setting.db) {
      new DB(setting.db)
    }
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
    // For api setting
    const options: cors.CorsOptions = {
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: '*',
      preflightContinue: false,
    };
    this.app.use(cors());
    this.app.use(route);
    this.app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname,'../views/index.html'));
    });
    this.app.get('/ping', this.ping);

    this.app.get('/socket', (req, res) => {
      res.sendFile(path.resolve(__dirname,'../views/socket.html'));
    });

  }

  private cors = () => {

  }
 
  private listen = () => {
    this.server.listen(setting["port"], () => {
      log.info(`| Name : ${setting["program"]} | Mode : ${setting["mode"]} | Version : ${setting["version"]} | Port : ${setting["port"]} |`);
    });
  }

  private ping = (req: any, res: any) => {
    const result = {
      project: 'Welcome to Momenta ' + setting["program"],
      mode : setting["mode"],
      dateTime: new Date(new Date().toUTCString()),
      version: setting["version"]
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
      program: setting["program"],
      mode: setting["mode"],
      timestamp: new Date(),
    };
    process
      .on('unhandledRejection', (reason: any, p) => {
        infoObject.message = 'Process unhandled rejection';
        infoObject.data = JSON.stringify({
          p,
          reason: reason.stack || reason,
        });
        log.error(infoObject);
      })
      .on('uncaughtException', (err) => {
        infoObject.message = 'Process uncaught exception';
        infoObject.data = JSON.stringify({
          reason: err.stack || err,
        }),
        log.error(infoObject);
      });
  }

  // getSocket = () => {
  //   return this.io;
  // }
}


export default new App();