import { Model } from "./model.service";
import { Message } from "../model";

class OtpService extends Model {
  constructor() {
    super(Message);
  } 
}


export const otpService = new OtpService();