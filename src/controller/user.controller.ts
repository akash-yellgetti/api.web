import * as express from 'express';
import path from 'path';
import fs from 'fs';
import { userService } from "../service";
import { Api, api, log } from '../utils';

class User {

  profilePicture = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    const files = request.files;
    log.info('controller.User.profilePicture');
    console.log('inputs', inputs);
    console.log('files', files);
    try {

      const file = request.files[0];
      const newFileName = new Date().getTime() + "_" + file.originalname;
      const targetPath = path.join(__dirname, '../public/uploads/profile/'+newFileName)
      const newFile = fs.createWriteStream(targetPath).write(file.buffer);

      return new Api(response).success().code(200).send({});
    } catch (e) {
      log.error( e);
      return new Api(response).error().code(200).send(e);
    }
  }

  detail = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    const user = request.user;
    log.info('controller.User.detail');
    try {
      const detail = await userService.readOne({ _id: user._id });
      console.log('detail', detail)
      const payload = { code: 200,  data:  detail, message: 'User detail' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      log.error( e);
      return new Api(response).error().code(200).send(e);
    }
  }
}

export const UserController = new User();