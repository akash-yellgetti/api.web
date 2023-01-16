
import { Model } from "./model.service";
import { ConversationMember } from "../model";
import { conversationService } from "./conversation.service";
import mongoose from "mongoose";
import _ from "lodash";

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

  getConversations = async (inputs: any, user: any) => {
    const userIds = [user._id];
    const ids = _.map(userIds, (r) => {
      return new mongoose.Types.ObjectId(r);
    })
    const query = [
      {
        $lookup:
          {
            from: "conversations",
            foreignField: "_id",
            localField: "conversationId",
            as: "conversationDetail"
          }
      },
      {
        $unwind: {
          path: '$conversationDetail',
          preserveNullAndEmptyArrays: false
        }
      },
      {
        $lookup:
          {
            from: "users",
            foreignField: "_id",
            localField: "userId",
            as: "userDetail"
          }
      },
      {
        $unwind: {
          path: '$userDetail',
          preserveNullAndEmptyArrays: false
        }
      },
      {
        $group: {
          _id: '$conversationId',
          users: { "$addToSet": "$userDetail" },
          // usersDetail: { "$addToSet": "$userDetail" },
          conversationDetail: { "$first": "$conversationDetail" }
        }
      },
      { "$match": { "users._id": { "$in": ids } } }
    ];
    return await this.aggregate(query);
  }

  getConversation = async (inputs: any, user: any) => {
    const conservations: any = await this.getConversations(inputs, user);
    const conversation: any = _.find(conservations, { _id: inputs.conservationId });
  }

  // createConversation = async (inputs: any, user: any) => {
  //   const conversation = await conversationService.create({ type: inputs.type });
  //   const conversationMembers = await this.addUsers([inputs.typeId], conversation._id, user._id);
  //   return await this.getConversation([user._id, inputs.typeId])
  // }
  
}


export const conversationMemberService = new ConversationMemberService();