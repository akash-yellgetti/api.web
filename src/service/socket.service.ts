import { Model } from "./model.service";
import { Socket } from "../model";
import _ from 'lodash';
import mongoose from "mongoose";

class SocketService extends Model {
  protected hidden: any = ['__v', 'createdBy', 'updatedBy'];
  protected populate: any = ['user', 'device'];
  constructor() {
    super(Socket);
  }

  updateSocketRecord = async (data: any) => { 
    const user = data.user;
    const where = { userId: new mongoose.Types.ObjectId(user._id), deviceId: user.deviceId  };
    const record = await this.readOne(where);
    
    if(record) {
      await this.update(where, { isActive: 0 })
    }

    await socketService.create({
      userId: data.user._id,
      socketId: data.user.userSocketId,
      deviceId: data.user.deviceId,
    });
  }
}


export const socketService = new SocketService();