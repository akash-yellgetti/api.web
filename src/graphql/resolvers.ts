import mongoose from "mongoose";
import { contactService, userService } from "../service";

export const resolvers = {
    users: async () => {
        return await userService.read();
    },
    user: async (id: string) => {
        try {
            const user: any = await userService.readOne({ _id: new mongoose.Types.ObjectId(id) });
            const contacts: any = await contactService.read({ userId: new mongoose.Types.ObjectId(id) });
            user.contacts = contacts;
            
            return user;
          } catch (error) {
            throw new Error('Failed to fetch users with contacts');
          }

    },
    createUser: async (args: any) => {
      return await userService.create(args);
    },
    contacts: async () => {
      return await contactService.read();
    },
    createContact: async (args: any) => {
      return await contactService.create(args.input);
    }
    
};