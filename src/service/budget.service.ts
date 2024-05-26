import { Model } from "./model.service";
import { Budget } from "../model";
import _ from 'lodash';
import { plannerService } from "./planner.service";
import { title } from "process";
import { describe } from "node:test";
class BudgetService extends Model {
  protected populate: any = [
    { 
      path: 'subdata', model: 'Budget', strictPopulate: false,     
    },
    { 
      path: 'user', model: 'User', strictPopulate: false,     
    }
  ];
  constructor() {
    super(Budget);
  }

  public async processCreate(inputs: any) {
    let budget: any = null; 
    switch (inputs.type) {
      case 'investment':
      case 'goal':
        
        break;
      case 'expense':
        if(inputs.category === 'loan') {
          const data: any = _.omit(inputs, ['planner']);
          data.amount = _.get(inputs, 'planner.current.emi', 0);
          budget = await this.create(data);
          const current: any = _.omit(inputs.planner.current, ['emi']);
          plannerService.create({ budgetId: budget._id, userId: budget.userId, title: data.title, description: data.description, type: inputs.category, data: inputs.planner, 
            ...current
          });
        }
        break;
      default:
        budget = await this.create(inputs);
        break;
    }

    return budget;
  }
}


export const budgetService = new BudgetService();