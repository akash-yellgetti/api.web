import { Model } from "./model.service";
import { ConversationMessage } from "../model";

class ConversationMessageService extends Model {
  constructor() {
    super(ConversationMessage);
  } 
}


export const conversationMessageService = new ConversationMessageService();