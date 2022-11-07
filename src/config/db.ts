import mongoose from "mongoose";
import config from "config";
import log from "../logger";

class DB {
  connect = (credential: any, options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) => {
    const uri = `mongodb://${credential.user}:${credential.password}@${credential.host}/${credential.db}?authSource=admin`;
    // return mongoose.createConnection(uri, options).then(() => {
    //   log.info("Database connected");
    // });
    return mongoose
    .connect(uri, options)
    // .then(() => {
    //   log.info("Database connected");
    // })
    // .catch((error) => {
    //   log.error("db error", error);
    //   process.exit(1);
    // });
  }
}


export const db = new DB();