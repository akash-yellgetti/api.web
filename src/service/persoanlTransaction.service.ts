import { Model } from "./model.service";
import { PersoanlTransaction } from "../model";
import _ from 'lodash';
import mongoose from "mongoose";

class PersoanlTransactionService extends Model {
  constructor() {
    super(PersoanlTransaction);
  }

  
}


export const persoanlTransactionService = new PersoanlTransactionService();