import * as express from 'express';
import { tradingviewService } from "../service";
import { Api, api, log } from '../utils';

class Tradingview {

  webhookLogs = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    log.info('controller.tradingview.webhook', inputs);
    try {
      const query = inputs && inputs.query ? inputs.query : [ {
        $match: {
          isActive: 1
        }
      } ];
      const data = await tradingviewService.aggregate(query);
      return new Api(response)
        .success()
        .code(200)
        .send({ data , message: 'webhook fetched Succesfully.' });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.tradingview.webhook', { error: e, inputs });
      return new Api(response)
        .error()
        .code(code)
        .send({ ...e });
    }
  }

  webhook = async (request: express.Request, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    log.info('controller.tradingview.webhook', inputs);
    try {
      const data = await tradingviewService.create(inputs);
      return new Api(response)
        .success()
        .code(200)
        .send({ data , message: 'webhook fetched Succesfully.' });
    } catch (e: any) {
      const code = e && e.code ? e.code : 400;
      log.error('controller.tradingview.webhook', { error: e, inputs });
      return new Api(response)
        .error()
        .code(code)
        .send({ ...e });
    }
  }
}

export const TradingviewController = new Tradingview();
