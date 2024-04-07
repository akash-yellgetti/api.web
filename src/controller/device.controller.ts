import * as express from 'express';
import { deviceService } from '../service';
import { Api, log } from '../utils';

class Device {
  list = async (request: any, response: express.Response) => {
    const inputs: any = { ...request.body, ...request.params };
    const user: any = request.user;
    log.info('controller.contact.list');
    try {
      const data = await deviceService.read({ userId: user._id });
      return new Api(response).success().code(200).send({ data });
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  };

  create = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    inputs.userId = request.user._id;
    log.info('controller.contact.created');
    try {

      inputs.data = { ...inputs }
      const user = await deviceService.create(inputs);
      return new Api(response)
        .success()
        .code(200)
        .send({ data: user, message: 'created Succesful' });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.contact.created', { ...e });
      return new Api(response)
        .error()
        .code(code)
        .send({ ...e });
    }
  };

  detail = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.User.detail');
    try {
      const detail = await deviceService.readOne({ _id: inputs._id });
      console.log('detail', detail);
      const payload = { code: 200, data: detail, message: 'contact detail' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      log.error(e);
      return new Api(response).error().code(200).send(e);
    }
  };
}

export const DeviceController = new Device();
