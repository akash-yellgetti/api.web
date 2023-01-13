
import { Model } from "./model.service";
import { Conversation } from "../model";

class ConversationService extends Model {
  constructor() {
    super(Conversation);
  }

  
}


export const conversationService = new ConversationService();