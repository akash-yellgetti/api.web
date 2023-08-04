import * as express from 'express';
import { persoanlTransactionService } from '../service';
import { Api, api, log } from '../utils';
import _ from 'lodash';
import { group } from 'console';

class PersonalTransaction {
  create = async (request: any, response: express.Response) => {
    const inputs: any = _.pick({ ...request.body, ...request.params }, [
      'date',
      'title',
      'amount',
      'type'
    ]);
    // const name: string = inputs && inputs.name ? inputs.name : '';
    const user = request.user;
    log.info('controller.User.detail');
    try {
      const persoanlTransaction: any = await persoanlTransactionService.create({
        userId: user._id,
        ...inputs
      });
      const payload = {
        code: 200,
        data: persoanlTransaction,
        message: 'persoanlTransaction created.'
      };
      return new Api(response).success().code(200).send(payload);
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  };
}

export const PersonalTransactionController = new PersonalTransaction();
