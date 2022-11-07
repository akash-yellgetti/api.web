import mongoose from "mongoose";
import config from "config";
import log from "../logger";

class DB {
  connect = (credential: any, options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) => {
    const uri = `mongodb://${credential.user}:${credential.password}@${credential.host}/${credential.db}?authSource=admin`;
    mongoose.connect(uri, options);
    mongoose.connection.on("error", this.error);
    mongoose.connection.on("connected", this.connected);
  }

  error = (err: any) => {
    log.error("mongoose connection issue", err)
  }

  connected = (err: any, res: any) => {
    if (err) {
      log.error("mongoose connection issue", err)
    } else {
      log.info("mongoose is connected", res)
    }
  }
}

export const db = new DB();