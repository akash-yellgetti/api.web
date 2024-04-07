import mongoose from "mongoose";
import { contactService, conversationMemberService, conversationMessageService, conversationService, deviceService, socketService, userService } from "../service";

export const resolvers = {
    getUsers: async () => {
        return await userService.read();
    },
    getUser: async (id: string) => {
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
    getDevices: async () => {
      return await deviceService.read();
    },
    createDevice: async (args: any) => {
      return await deviceService.create(args.input);
    },
    getSockets: async () => {
      return await socketService.read();
    },
    createSocket: async (args: any) => {
      return await socketService.create(args.input);
    },
    getContacts: async () => {
      return await contactService.read();
    },
    createContact: async (args: any) => {
      return await contactService.create(args.input);
    },
    getConversations: async () => {
      return await conversationService.read();
    },
    createConversation: async (args: any) => {
      return await conversationService.create(args.input);
    },
    getConversationMembers: async (id: string) => {
      return await conversationMemberService.read({ conversationId: new mongoose.Types.ObjectId(id) });
    },
    createConversationMember: async (args: any) => {
      return await conversationMemberService.create(args.input);
    },
    getConversationMessages: async () => {
      return await conversationMessageService.read();
    },
    createConversationMessage: async (args: any) => {
      return await conversationMessageService.create(args.input);
    },
};