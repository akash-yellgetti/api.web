import { Model } from "./model.service";
import { Budget } from "../model";

class BudgetService extends Model {
  protected populate: any = [
    { 
      path: 'subdata', model: 'Budget', strictPopulate: false,     
    }
  ];
  constructor() {
    super(Budget);
  } 
}


export const budgetService = new BudgetService();