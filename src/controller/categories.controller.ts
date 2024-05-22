import * as express from 'express';
import { categoriesService } from "../service";
import { Api, api, log } from '../utils';

class Categories {

  list = async (request: any, response: express.Response) => {
    const inputs: any = { ...request.body, ...request.params };
    const user: any = request.user;
    log.info('controller.budget.list');
    try {
      const data = await categoriesService.read(inputs, 0);
      return new Api(response).success().code(200).send({ data });
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  };

  detail = async (request: any, response: express.Response) => {
    const inputs: any = { ...request.body, ...request.params };
    const user: any = request.user;
    log.info('controller.budget.list');
    try {
      const data = await categoriesService.readOne({ code: inputs.code });
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
    log.info('controller.budget.create');
    try {
      const data: any = await categoriesService.create(inputs);
      const payload = { code: 200, data, message: 'Budget create.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      log.error(e);
      return new Api(response).error().code(200).send(e);
    }
  };

  bulkCreate = async (request: any, response: express.Response) => {
    const inputs: any = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.budget.bulkCreate');
    try {
      const data: any = await categoriesService.bulkCreate(inputs.data);
      const payload = { code: 200, data, message: 'Budget bulk create.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      log.error(e);
      return new Api(response).error().code(200).send(e);
    }
  };

  delete = async (request: any, response: express.Response) => {
    const inputs: any = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.budget.delete');
    try {
      const data: any = await categoriesService.hardDeleteOne({ _id: inputs.id });
      const payload = { code: 200, data, message: 'Budget deleted.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e) {
      log.error(e);
      return new Api(response).error().code(200).send(e);
    }
  };
}

export const CategoriesController = new Categories();