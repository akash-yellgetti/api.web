import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import Socket from "../model/socket.model";

class SocketService {
    create = async (input: any) => {
      try {
        console.log(input)
        return await Socket.create(input);
      } catch(e) {
        throw e;
      }
    }

    read = (query: any) => {
        return Socket.findOne(query).lean();
    }

    update = () => {
        
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