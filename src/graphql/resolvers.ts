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
    getUsersWithContacts: async () => {
        try {
          const users = await userService.read();
          // Populate contacts for each user
          const usersWithContacts = await Promise.all(users.map(async (user: any) => {
            const contacts = await contactService.read({ userId: user._id  });
            user.contacts = contacts;
            return user;
          }));
          return usersWithContacts;
        } catch (error) {
          throw new Error('Failed to fetch users with contacts');
        }
    }
};