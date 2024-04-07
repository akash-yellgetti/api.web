import { Model } from "./model.service";
import { Device, Socket } from "../model";

class DeviceService extends Model {
  protected hidden: any = ['__v', 'createdBy', 'updatedBy'];
  protected populate: any = ['user'];
  constructor() {
    super(Device);
  } 
}


export const deviceService = new DeviceService();