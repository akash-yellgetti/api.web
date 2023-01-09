import * as express from 'express';
import { Api, log } from '../utils';
import { moneyControlService } from "../service";

class MoneyControl {
  search = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.auth.check');
    try {
      const data = await moneyControlService.search(inputs.text);
      const payload = { data, message: 'stock candles.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      return new Api(response).error().code(400).send(e);
    }
  };

  getCandleData = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.auth.check');
    try {
      const data = await moneyControlService.getCandleData('TATASTEEL', 60, 1667513983, 1673245626, 308,'INR');
      const payload = { data, message: 'stock candles.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      return new Api(response).error().code(200).send(e);
    }
  };
}

export const MoneyControlController = new MoneyControl();
