import mongoose from "mongoose";
import {
  constantService,
  contactService,
  conversationMemberService,
  conversationMessageService,
  conversationService,
  deviceService,
  socketService,
  userService,
  budgetService,
  plannerService
} from '../service';


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
    getConstants: async (args: any) => {
      return await constantService.read(args.input);
    },
    createConstant: async (args: any) => {
      return await constantService.create(args.input);
    },
    getBudget: async (args: any) => {
      return await budgetService.read(args.input);
    },
    createBudget: async (args: any) => {
      return await budgetService.create(args.input);
    },
    bulkCreateBudget: async (args: any) => {
      return await budgetService.bulkCreate(args.input);
    },
    deleteBudget: async (id: string) => {
      return await plannerService.hardDeleteOne({ _id: new mongoose.Types.ObjectId(id) });
    },
    getPlanner: async (args: any) => {
      return await plannerService.read(args.input);
    },
    createPlanner: async (args: any) => {
      return await plannerService.create(args.input);
    },
    deletePlanner: async (args: any) => {
      return await plannerService.hardDeleteOne(args.input);
    },
    
    getDevices: async () => {
      return await deviceService.read();
    },
    createDevice: async (args: any) => {
      return await deviceService.create(args.input);
    },
    getSockets: async (args: any) => {
      return await socketService.read(args.input);
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
    
    getUserConversations: async (id: string) => {
      return await conversationMemberService.read({ userId: new mongoose.Types.ObjectId(id) });
    },
    getConversationMembers: async () => {
      return await conversationMemberService.read();
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