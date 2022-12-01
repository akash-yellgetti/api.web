import { Model } from "./model.service";
import { Otp, Socket } from "../model";

class OtpService extends Model {
  constructor() {
    super(Otp);
  } 
}


export const otpService = new OtpService();