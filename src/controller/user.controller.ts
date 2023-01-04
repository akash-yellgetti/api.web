import * as express from 'express';
import path from 'path';
import fs from 'fs';
import { userService } from "../service";
import { Api, api, log } from '../utils';
import _ from 'lodash';

class User {

  profilePicture = async (request: any, response: express.Response) => {
    const user: any = request.user;
    const inputs = { ...request.body, ...request.params};
    const files = request.files;
    log.info('controller.User.profilePicture');
    // console.log('inputs', inputs);
    // console.log('files', files);
    try {

      const file = request.files[0];
      const newFileName = new Date().getTime() + "_" + _.toLower(file.originalname);
      const filesDir: any = path.join(__dirname, '../public/uploads/'+ user._id +'/profile');
      // check if directory exists
      if (!fs.existsSync(filesDir)) {
        // if not create directory
        fs.mkdirSync(filesDir, { recursive: true });
      }
      const targetPath = 'uploads/'+ user._id +'/profile/'+newFileName;
      const newFile = fs.createWriteStream(path.join(__dirname, '../public/'+ targetPath)).write(file.buffer);
      await userService.updateOne({ _id: user._id }, { profilePicture: targetPath });
      const payload = { code: 200,  data:  { targetPath }, message: 'User Profile Picture Uploaded' };
      return new Api(response).success().code(200).send(payload);
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