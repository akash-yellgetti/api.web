import { Model } from "./model.service";
import { Group } from "../model";

class GroupService extends Model {
  constructor() {
    super(Group);
  } 
}


export const groupService = new GroupService();