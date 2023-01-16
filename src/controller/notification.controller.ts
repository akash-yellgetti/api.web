import * as express from 'express';
import { jwt } from '../utils/jwt.utils';
import { setting } from '../config/setting';
import { socketService } from '../service';
import { Api, api, log } from '../utils';
import { app } from '../config/app';

class Notification {
  send = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    log.info('controller.socket.list');
    try {
        app.getSocketIO().to("main-channel").emit("notification", inputs)
      //   const user = await socketService.read({  isActive: true });
      return new Api(response).success().code(200).send({});
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  };
}

export const NotificationController = new Notification();
