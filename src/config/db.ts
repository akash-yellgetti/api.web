import mongoose from 'mongoose';
import { log } from '../utils';
class DB {
  private static instance: DB;
  private config: any;
  private options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  // tslint:disable-next-line
  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }

    return DB.instance;
  }

  setConfig = (config: any) => {
    this.config = config;
    return this;
  };

  getConfig = () => {
    return this.config;
  };

  connect = () => {
    const config: any = this.getConfig();
    const uri = `mongodb+srv://${config.user}:${config.password}@${config.host}/?retryWrites=true&w=majority&appName=Cluster0`;
    console.log(uri)
    // const uri =
    //   config.user && config.password
    //     ? `mongodb://${config.user}:${config.password}@${config.host}/${config.db}?authSource=admin`
    //     : `mongodb://${config.host}/${config.db}?authSource=admin`;
    mongoose.set('strictQuery', false);
    mongoose.connect(uri, this.options);
    mongoose.connection.on('connected', this.connected);
    mongoose.connection.on('reconnected', this.reconnected);
    mongoose.connection.on('disconnected', this.disconnected);
    mongoose.connection.on('error', this.error);
  };

  connected = (err: any, res: any) => {
    if (err) {
      log.error('mongoose connection issue', err);
    } else {
      log.info('mongoose is connected', res);
    }
  };

  reconnected = (err: any, res: any) => {
    log.info('mongoose has reconnected');
  };

  disconnected = (err: any, res: any) => {
    log.error('Mongo connection is disconnected');
  };

  error = (err: any) => {
    log.error('mongoose connection issue', err);
  };
}

export const db = DB.getInstance();
