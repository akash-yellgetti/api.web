import { Model } from "./model.service";
import { Message } from "../model";

class MessageService extends Model {
  constructor() {
    super(Message);
  } 
}


export const messageService = new MessageService();