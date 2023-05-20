import * as express from 'express';
import { jwt } from '../utils/jwt.utils';
import { setting } from '../config/setting';
import { socketService, userService } from '../service';
import { Api, api, log } from '../utils';
import { app } from '../config/app';
import { notificationService } from '../service/notification.service';
import mongoose from "mongoose";
import { notification } from '../route';
class Notification {
  send = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    log.info('controller.socket.list');
    try {
      const notification: any = await notificationService.create({
        title: inputs.title,
        description: inputs.description,
        recipient: inputs.recipient
      });
      const userSocket: any = await socketService.readOne({  userId: new mongoose.Types.ObjectId(inputs.recipient), isActive: 1 });
      if(userSocket && userSocket.socketId) {
        app.getSocketIO().to(userSocket.socketId).emit("notification", { eventName: 'notification', eventTo: userSocket.socketId, data: notification });
      }
      return new Api(response).success().code(200).send({ data: notification });
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  };

  list = async (request: any, response: express.Response) => {
    const inputs: any = { ...request.body, ...request.params};
    const user: any = request.user;
    log.info('controller.session.list');
    try {
      const data = await notificationService.read({ recipient: new mongoose.Types.ObjectId(user._id) });
      return new Api(response).success().code(200).send({ data });
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  }
}

export const NotificationController = new Notification();
