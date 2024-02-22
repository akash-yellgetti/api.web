import * as express from 'express';
import { fyersService } from "../service";
import { Api, api, log } from '../utils';

class Fyers {

  app = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    log.info('controller.fyers.webhook', inputs);
    try {
      const data = await fyersService.webhookLogs();
      return new Api(response)
        .success()
        .code(200)
        .render('../views/fyers/index.html');
        
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.fyers.webhook', { error: e, inputs });
      return new Api(response)
        .error()
        .code(code)
        .send({ ...e });
    }
  }

  webhookLogs = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    log.info('controller.fyers.webhook', inputs);
    try {
      const data = await fyersService.webhookLogs();
      return new Api(response)
        .success()
        .code(200)
        .send({ data , message: 'webhook fetched Succesfully.' });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.fyers.webhook', { error: e, inputs });
      return new Api(response)
        .error()
        .code(code)
        .send({ ...e });
    }
  }

  webhook = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    log.info('controller.fyers.webhook', inputs);
    try {
      const data = await fyersService.handleWebhook(inputs);
      return new Api(response)
        .success()
        .code(200)
        .send({ data , message: 'webhook fetched Succesfully.' });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.fyers.webhook', { error: e, inputs });
      return new Api(response)
        .error()
        .code(code)
        .send({ ...e });
    }
  }

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
  
  
  getHistoricalData = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    log.info('controller.fyers.getHistoricalData');
    try {
      const data = await fyersService.getHistoricalData(inputs);
      return new Api(response)
        .success()
        .code(200)
        .send({ data , message: 'getHistoricalData fetched Succesfully.' });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.fyers.getHistoricalData', { ...e });
      return new Api(response)
        .error()
        .code(code)
        .send({ ...e });
    }
  };

  getPositions = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    log.info('controller.fyers.getPositions');
    try {
      const data = await fyersService.getPositions();
      return new Api(response)
        .success()
        .code(200)
        .send({ data , message: 'getPositions fetched Succesfully.' });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.fyers.getPositions', { ...e });
      return new Api(response)
        .error()
        .code(code)
        .send({ ...e });
    }
  };

  getOrders = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    log.info('controller.fyers.getOrders');
    try {
      const data = await fyersService.getOrders();
      return new Api(response)
        .success()
        .code(200)
        .send({ data , message: 'getOrders fetched Succesfully.' });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.fyers.getOrders', { ...e });
      return new Api(response)
        .error()
        .code(code)
        .send({ ...e });
    }
  };

  orderPlace = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    log.info('controller.fyers.orderPlace');
    try {
      const data = await fyersService.orderPlace(inputs);
      return new Api(response)
        .success()
        .code(200)
        .send({ data , message: 'orderPlace fetched Succesfully.' });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.fyers.orderPlace', { ...e });
      return new Api(response)
        .error()
        .code(code)
        .send({ ...e });
    }
  };
}

export const FyersController = new Fyers();
