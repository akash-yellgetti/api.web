import * as express from 'express';
import {
  plannerService
} from '../service';
import { Api, api, log } from '../utils';
import _ from 'lodash';

class Planner {
  list = async (request: any, response: express.Response) => {
    const inputs: any = { ...request.body, ...request.params };
    const user: any = request.user;
    log.info('controller.planner.list');
    try {
      const data = await plannerService.read({ userId: user._id });
      return new Api(response).success().code(200).send({ data });
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  };

  create = async (request: any, response: express.Response) => {
    const inputs: any = { ...request.body, ...request.params };
    const user = request.user;
    inputs.userId = user._id;
    log.info('controller.planner.create');
    try {
      const data: any = await plannerService.create(inputs);
      const payload = { code: 200, data, message: 'Planner create.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      log.error(e);
      return new Api(response).error().code(200).send(e);
    }
  };

  bulkCreate = async (request: any, response: express.Response) => {
    const inputs: any = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.planner.bulkCreate');
    try {
      const data: any = await plannerService.bulkCreate(inputs.data);
      const payload = { code: 200, data, message: 'Planner bulk create.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      log.error(e);
      return new Api(response).error().code(200).send(e);
    }
  };

  delete = async (request: any, response: express.Response) => {
    const inputs: any = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.planner.delete');
    try {
      const data: any = await plannerService.hardDeleteOne({ _id: inputs.id });
      const payload = { code: 200, data, message: 'Planner deleted.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      log.error(e);
      return new Api(response).error().code(200).send(e);
    }
  };
}

export const PlannerController = new Planner();
