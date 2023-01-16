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
import { Api, log } from '../utils';
import { route } from "./route";
import ErrorHandler from "../utils/error-handler.util";
import { processExceptionHandler } from "./processExceptionHandler";
import { socket } from "../route";

export class App {
  private app: express.Application;
  private server: any;
  private db: any;
  private io: any;
  private static instance: App;

  constructor() {
    const app = express();
    this.app = app;
    const server = http.createServer(app);
    const options: cors.CorsOptions = {
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: '*',
      preflightContinue: false,
    };
    if(setting && setting.socket) {
      const io = new Server(server, {
        cors: options
      });
      this.io = io;
      this.io.on('connection', (socket: any) => {
        socket.on("connected", async (data: any) => {
          socket.join("main-channel");
          // socket.join("notification-channel");
        })
      
        setInterval(function () { 
          // socket
          io.to("main-channel").emit("notification", { title: "Sample Notification "+ new Date().getTime() });
        }, 20 * 1000);
        
      
        // socket.emit("noti")
      
        socket.on("disconnect", async (data: any) => {
          
        })
      })
    }
    this.server = server;
    this.listen();
    this.processExceptionHandler();
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
    // Serving Static Files
    this.app.use(express.static(path.resolve(__dirname,'../views/app')));
    this.app.use(express.static(path.resolve(__dirname,'../public')));
    // For api setting
    
    this.app.use(cors());
    this.app.use(ErrorHandler);
    this.app.use(route);
    this.app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname,'../views/app/index.html'));
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

  private processExceptionHandler = () => {

    process.on('unhandledRejection', processExceptionHandler.unhandledRejection);
    process.on('uncaughtException', processExceptionHandler.uncaughtException);
    process.on('warning', processExceptionHandler.warning);
    
    // const infoObject: any = {
    //   type: 'server',
    //   program: setting["program"],
    //   mode: setting["mode"],
    //   timestamp: new Date(),
    // };
    // process
    //   .on('unhandledRejection', (reason: any, p) => {
    //     infoObject.message = 'Process unhandled rejection';
    //     infoObject.data = JSON.stringify({
    //       p,
    //       reason: reason.stack || reason,
    //     });
    //     log.error(infoObject);
    //     // return new Api(response).error().code(200).send(reason);
    //   })
    //   .on('uncaughtException', (err) => {
    //     infoObject.message = 'Process uncaught exception';
    //     infoObject.data = JSON.stringify({
    //       reason: err.stack || err,
    //     }),
    //     log.error(infoObject);
    //   });
  }

  getSocketIO = () => {
    return this.io;
  }
}


export const app =  new App();