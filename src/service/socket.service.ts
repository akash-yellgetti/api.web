import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import Socket from "../model/socket.model";

class SocketService {
    create = async (input: any) => {
      try {
        console.log(input)
        return await Socket.findOneAndUpdate(input, {
            new: true,
            upsert: true // Make this update into an upsert
          });
      } catch(e) {
        throw e;
      }
    }

    read = async (query: any) => {
      return await Socket.find(query).lean();
    }

    readOne = async (query: any) => {
      return await Socket.findOne(query).lean();
    }

    update = async (filter: any, update: any) => {
      return await Socket.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true // Make this update into an upsert
      });
    }

    // Soft Delete
    delete = () => {
        
    }

    softDelete = async (filter: any, update: any) => {
        console.log(filter)
        console.log(update)
        return await Socket.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true // Make this update into an upsert
          });
    }

    
}


export const socketService = new SocketService();