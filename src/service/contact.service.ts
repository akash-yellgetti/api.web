import { Model } from "./model.service";
import { Contact } from "../model";

class ContactService extends Model {
  constructor() {
    super(Contact);
  } 
}


export const contactService = new ContactService();