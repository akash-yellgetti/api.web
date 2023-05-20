import { Model } from "./model.service";
import { Notification } from "../model";

class NotificationService extends Model {
  constructor() {
    super(Notification);
  } 
}


export const notificationService = new NotificationService();