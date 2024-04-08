import { Model } from "./model.service";
import { Contact } from "../model";

class ContactService extends Model {
  protected hidden: any = ['__v', 'password', 'createdBy', 'updatedBy'];
  protected populate: any = ['user', 'refUser'];
  constructor() {
    super(Contact);
  } 
}


export const contactService = new ContactService();