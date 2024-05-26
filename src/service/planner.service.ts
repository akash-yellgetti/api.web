import { Model } from "./model.service";
import { Planner } from "../model";

class PlannerService extends Model {
  protected populate: any = [
    { 
    path: 'user', model: 'User', strictPopulate: false,     
  },{
    path: 'budget', model: 'Budget', strictPopulate: false,     
  }];
  constructor() {
    super(Planner);
  } 
}


export const plannerService = new PlannerService();