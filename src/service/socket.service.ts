import { Model } from "./model.service";
import { Socket } from "../model";

class SocketService extends Model {
  constructor() {
    super(Socket);
  }
}


export const socketService = new SocketService();