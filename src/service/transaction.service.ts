import { Model } from "./model.service";
import { Transaction } from "../model";
import _ from 'lodash';
import mongoose from "mongoose";

class TransactionService extends Model {
  constructor() {
    super(Transaction);
  }

  
}


export const transactionService = new TransactionService();