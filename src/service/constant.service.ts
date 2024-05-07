import { Model } from "./model.service";
import { Constant } from "../model";

class ConstantService extends Model {
  protected populate: any = [
    { 
      path: 'subdata', model: 'constant', strictPopulate: false, 
      
    }];
  constructor() {
    super(Constant);
  } 
}


export const constantService = new ConstantService();