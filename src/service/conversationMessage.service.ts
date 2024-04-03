import { Model } from "./model.service";
import { ConversationMessage } from "../model";

class ConversationMessageService extends Model {
  protected hidden: any = ['__v', 'password', 'createdBy', 'updatedBy'];
  protected populate: any = [
    {  path: 'user',  model: 'User' },
    {  path: 'conversation',  model: 'Conversation' },
  ];
  constructor() {
    super(ConversationMessage);
  } 
}


export const conversationMessageService = new ConversationMessageService();