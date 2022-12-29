import mongoose from "mongoose";
import config from "config";
import { log } from '../utils';

export default class DB {
  // private static instance: DB;

  // // tslint:disable-next-line
  // public static getInstance(): DB {
  //   if (!DB.instance) {
  //     DB.instance = new DB();
  //   }

  //   return DB.instance;
  // }

  constructor(config: any, options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) {
    this.connect(config, options)
  }

  connect = (credential: any, options: any) => {
    const uri = `mongodb://${credential.user}:${credential.password}@${credential.host}/${credential.db}?authSource=admin`;
    mongoose.set('strictQuery', false);
    mongoose.connect(uri, options);
    mongoose.connection.on("connected", this.connected);
    mongoose.connection.on("reconnected", this.reconnected);
    mongoose.connection.on("disconnected", this.disconnected);
    mongoose.connection.on("error", this.error);
  }

  connected = (err: any, res: any) => {
    if (err) {
      log.error("mongoose connection issue", err)
    } else {
      log.info("mongoose is connected", res)
    }
  }

  reconnected = (err: any, res: any) => {
    log.info('mongoose has reconnected')
  }

  disconnected = (err: any, res: any) => {
    log.error('Mongo connection is disconnected')
  }

  error = (err: any) => {
    log.error("mongoose connection issue", err)
  }
}

