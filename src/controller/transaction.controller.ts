import * as express from 'express';
import { transactionService } from '../service';
import { Api, api, log } from '../utils';
import _ from 'lodash';
import mongoose from 'mongoose';
import { error } from 'console';
import { Excel } from '../utils/excel.util';

class Transaction {
  create = async (request: any, response: express.Response) => {
    const errors: any = [];
    const inputs = { ...request.body, ...request.params};
    if (inputs && !inputs.title) {
      // errors.push({ file: 'File is required.' });
      errors.push({  
        path: "body.title",
        type: "required",
        message: 'Title is required.',
      } );
    }

    const file: any = request.files[0];
    
    if (!file) {
      errors.push({ 
        path: "body.file",
        type: "required",
        message: 'File is required.',
      } );
    }

    if(errors && errors.length > 0) {
      return new Api(response).code(400).error().send({ message: 'Validation Failed.', data: errors  })
    }

    const files: any = request.files;
      // const self: any = this;
      // const file: any = _.find(files, { fieldname: 'file' });
    const fileData: any = Excel.CONVERT_TO_JSON(file.buffer);
    const keyToReplace: any = { 
      'Date': 'date', 
      'Description': 'description', 
      'Credit': 'credit', 
      'Debit': 'debit',
      'Balance': 'balance' 
    };
    let data = Excel.transform(fileData, keyToReplace);
    data = _.map(data, (item: any) => {
      return {
        transactionDate: Excel.date2ms(item.date),
        ...item
      };
    })

    const user = request.user;
    log.info('controller.User.detail');
    try {
      const Transaction: any = await transactionService.create({
        userId: user._id,
        title: inputs.title,
        description: inputs.description || '#',
        data: data
      });
      const payload = {
        code: 200,
        data: Transaction,
        message: 'Transaction created.'
      };
      return new Api(response).success().code(200).send(payload);
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  };

  list = async (request: any, response: express.Response) => {
    const inputs = { ...request.body, ...request.params };
    const user = request.user;
    log.info('controller.auth.check');
    try {

      const query: any = [
        {
          $match: {
            userId: new mongoose.Types.ObjectId(user._id)
          }
        },
        {
          $addFields: {
            transactionMonth: { $month: "$date" },
          },
        },
        {
          $match: {
            transactionMonth: inputs.month
          }
        }
      ];

      const transactions: any = await transactionService.aggregate(query);
      const payload = { data: transactions, message: 'transaction list.' };
      return new Api(response).success().code(200).send(payload);
    } catch (e: any) {
      log.error(e.message, e);
      return new Api(response).error().code(400).send(e);
    }
  };
}

export const TransactionController = new Transaction();
