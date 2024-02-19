import * as express from 'express';
import { fyersService } from "../service";
import { Api, api, log } from '../utils';

class Fyers {
  getAuthCode = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    log.info('controller.fyers.getAuthCode');
    try {
      const data = await fyersService.getAuthCode();
      return new Api(response)
        .success()
        .code(200)
        .send({ data , message: 'authcode fetched Succesfully.' });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.fyers.getAuthCode', { ...e });
      return new Api(response)
        .error()
        .code(code)
        .send({ ...e });
    }
  };

  getAccessToken = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params, ...request.query };
    log.info('controller.fyers.getAccessToken');
    try {
      const data = await fyersService.getAccessToken(inputs);
      return new Api(response)
        .success()
        .code(200)
        .send({ data , message: 'access token fetched Succesfully.' });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.fyers.getAccessToken', { ...e });
      return new Api(response)
        .error()
        .code(code)
        .send({ ...e });
    }
  };

  getProfile = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    log.info('controller.fyers.profile');
    try {
      const data = await fyersService.getProfile();
      return new Api(response)
        .success()
        .code(200)
        .send({ data , message: 'profile fetched Succesfully.' });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.fyers.profile', { ...e });
      return new Api(response)
        .error()
        .code(code)
        .send({ ...e });
    }
  };

  orders = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    log.info('controller.fyers.profile');
    try {
      const data = await fyersService.orders();
      return new Api(response)
        .success()
        .code(200)
        .send({ data , message: 'profile fetched Succesfully.' });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.fyers.profile', { ...e });
      return new Api(response)
        .error()
        .code(code)
        .send({ ...e });
    }
  };
}

export const FyersController = new Fyers();
