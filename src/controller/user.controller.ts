import * as express from 'express';
import { userService } from "../service";
import { Api, api, log } from '../utils';

class User {

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