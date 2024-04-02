import * as express from 'express';
import { contactService } from '../service';
import { Api, api, log } from '../utils';
import _ from 'lodash';

class Contact {

  create = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params};
    inputs.userId = request.user._id;
    log.info('controller.contact.created');
    try {
      const user = await contactService.create(inputs);
      return new Api(response).success().code(200).send({  data:  user, message: "created Succesful" });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.contact.created', { ...e });
      return new Api(response).error().code(code).send({ ...e });
    }
  }

  detail = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.User.detail');
    try {
      const detail = await contactService.readOne({ _id: inputs._id });
      console.log('detail', detail);
      const payload = { code: 200, data: detail, message: 'contact detail' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      log.error(e);
      return new Api(response).error().code(200).send(e);
    }
  };
}

export const ContactController = new Contact();
