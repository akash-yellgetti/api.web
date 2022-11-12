import * as express from 'express';
import { jwt } from "../utils/jwt.utils";
import { setting } from "../config/setting";
import log from "../logger";
import { socketService } from "../service/index.service";
import { apiResponse } from '../utils/response.utils';

class Socket {

  list = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    log.info('controller.socket.list');
    try {
      const user = await socketService.read({  isActive: true });
      return apiResponse(response,{ code: 200, status: 'success', data:  user, message: 'Socket Active List' });
    } catch (e) {
      log.error( e);
      return response.status(409).json(e);
    }
  }
}

export const SocketController = new Socket();