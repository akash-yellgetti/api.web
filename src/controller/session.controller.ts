import * as express from 'express';
import { jwt } from "../utils/jwt.utils";
import { setting } from "../config/setting";
import { socketService } from "../service";
import { api, log } from '../utils';

class Session {

  list = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    log.info('controller.session.list');
    try {
      const user = await socketService.read({  isActive: true });
      return api.response(response,{ code: 200, status: 'success', data:  user, message: 'Socket Active List' });
    } catch (e) {
      log.error( e);
      return response.status(409).json(e);
    }
  }
}

export const SessionController = new Session();