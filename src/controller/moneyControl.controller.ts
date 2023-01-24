import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';
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
      const params: any = {
        symbol: 'TATASTEEL',
        min: 5,
        // from: (new Date('2022-11-28 09:00 GMT').getTime()/1000),
        // to: (new Date('2022-12-02 03:30 GMT').getTime()/1000),
        countback: 76,
        currencyCode: 'INR',
        ...inputs
      }

      console.log(new Date(params.from).toUTCString())

      // example '2022-12-02 03:30 GMT'
      params.from =  (new Date(params.from).getTime()/1000),
      params.to =  (new Date(params.to).getTime()/1000),
        
      console.log('from', new Date(params.from*1000))
      console.log('to', new Date(params.to*1000))
    
      const data = await moneyControlService.getCandleData(params.symbol, params.min, params.from, params.to, params.countback, params.currencyCode);
      const payload = { data, message: 'stock candles.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      return new Api(response).error().code(200).send(e);
    }
  };


  getPeaks = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.auth.check');
    try {
      const fileData = fs.readFileSync(path.join(__dirname, '../json/tcs.json'), 'utf8');
      const data = JSON.parse(fileData);
      // const params: any = {
      //   symbol: 'TATASTEEL',
      //   min: 60,
      //   from: 1667513983,
      //   to: 1673245626,
      //   countback: 308,
      //   currencyCode: 'INR',
      //   ...inputs
      // }
      const peaks = await moneyControlService.findPeaks(data, 'high');
      const payload = { data: peaks, message: 'stock candles.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      return new Api(response).error().code(200).send(e);
    }
  };
}

export const MoneyControlController = new MoneyControl();
