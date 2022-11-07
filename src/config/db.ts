import mongoose from "mongoose";
import config from "config";
import log from "../logger";

class DB {
  connect = (credential: any, options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) => {
    const uri = `mongodb://${credential.user}:${credential.password}@${credential.host}/${credential.db}?authSource=admin`;
    return mongoose
    .connect(uri, options, (err) => {
      if(err) {
        log.error("db error", err);
      } else {
        log.info("Database connected");
      }
    });
  }

  error = () => {

  }

  connection = () => {

  }
}


export const db = new DB();