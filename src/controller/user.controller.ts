import * as express from 'express';
import { userService } from "../service";
import { api, log } from '../utils';

class User {

  detail = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    log.info('controller.socket.list');
    try {
      const user = await userService.readOne({   "_id": "636fdc904b636473a49a613f" });
      return api.response(response,{ code: 200, status: 'success', data:  user, message: 'Socket Active List' });
    } catch (e) {
      log.error( e);
      return response.status(409).json(e);
    }
  }
}

export const UserController = new User();