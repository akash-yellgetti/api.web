import * as express from 'express';
import { conversationService } from "../service";
import { Api, api, log } from '../utils';

class Conversation {
    
    send = async (request: any, response: express.Response) => {
        const inputs = { ...request.body, ...request.params};
        const user = request.user;
        log.info('controller.auth.check');
        try {
          const payload = { data: user, message: 'authenicated successfully.' };
          return new Api(response).success().code(200).send(payload);
        } catch (e) {
          return new Api(response).error().code(200).send(e);
        }
    }
}