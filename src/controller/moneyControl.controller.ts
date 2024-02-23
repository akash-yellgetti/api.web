import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import moment from 'moment';
import _ from 'lodash';
import { Api, log } from '../utils';
import { moneyControlService } from "../service";


class MoneyControl {

  app = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.money-control.app');
    try {
      return new Api(response)
        .success()
        .code(200)
        .render('../views/money-control/index.html');
    } catch (e) {
      return new Api(response).error().code(400).send(e);
    }
  };

  optionChain = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.money-control.optionChain');
    try {
      const data = await moneyControlService.optionChain(inputs);
      const payload = { data, message: 'optionChain data.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      return new Api(response).error().code(400).send(e);
    }
  };

  search = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.money-control.search');
    try {
      const data = await moneyControlService.search(inputs.text);
      const payload = { data, message: 'stock candles.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      return new Api(response).error().code(400).send(e);
    }
  };

  details = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.money-control.details');
    try {
      const data = await moneyControlService.details(inputs.code);
      const payload = { data, message: 'share details.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      return new Api(response).error().code(400).send(e);
    }
  };

  getCandleData = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.money-control.getCandleData');
    // Get the current date and time
    const now: any = new Date();
    // Set the target time to 9:00 AM
    // const targetTime = new Date(now);
    const targetTime: any = moneyControlService.getNextNonWeekendDay(now);
    targetTime.setHours(9, 0, 0, 0); // Set hours to 9, minutes to 0, seconds to 0, milliseconds to 0

    const duration = '3';
    // Calculate the difference in minutes
    const timeDifferenceInMinutes = Math.floor((targetTime - now) / (1000 * 60));
    const countback = (Math.abs(Math.round(timeDifferenceInMinutes/Number(duration)))-5).toString();

    const fromdateTimeString = targetTime;
    const from = moment(fromdateTimeString, "YYYY-MM-DD HH:mm:ss").unix();
    const todateTimeString = new Date();
    // const todateTimeString = "2024-01-25 15:30:05";
    const to = moment(todateTimeString, "YYYY-MM-DD HH:mm:ss").unix();
    // console.log(to)
  
    try {
      const params: any = {
        symbol: 'TATASTEEL',
        duration: 3,
        from,
        to,
        countback,
        currencyCode: 'INR',
        type: 'stock',
        ...inputs
      }

      const data = await moneyControlService.getCandleData(params);
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
