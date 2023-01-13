
import { Model } from "./model.service";
import { ConversationMember } from "../model";
import { conversationService } from "./conversation.service";

class ConversationMemberService extends Model {
  constructor() {
    super(ConversationMember);
  }

  addUsers = async (userIds: any[], conversationId: any, userId: any) => {
    const data: any = [];
    const users = [...userIds, userId];
    for (const i in users) {
      if (Object.prototype.hasOwnProperty.call(users, i)) {
        data.push({ conversationId, userId: users[i], createdBy: userId, updatedBy: userId });
      }
    }
    return await this.bulkCreate(data);
  }

  getConversation = async (userIds: any) => {
    const query = [
      // {
      //   $match: {
      //     userId: {
      //       $in: userIds
      //     },
      //   },
      // },
      {
        $group: {
          _id: '$conversationId',
          users: { "$addToSet": "$userId" }
        }
      },
      // {
      //   $replaceRoot: {
      //     newRoot: {
      //       $mergeObjects: [{ $arrayElemAt: ['$uniqueValues', 0] }, '$$ROOT'],
      //     },
      //   },
      // },
      // { "$match": { "users": { "$all": userIds } } }
    ];
    return await this.aggregateOne(query);
  }

  createConversation = async (inputs: any, user: any) => {
    const conversation = await conversationService.create({ type: inputs.type });
    const conversationMembers = await this.addUsers([inputs.typeId], conversation._id, user._id);
    return await this.getConversation([user._id, inputs.typeId])
  }
  
}


export const conversationMemberService = new ConversationMemberService();