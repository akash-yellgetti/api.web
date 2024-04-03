import _ from 'lodash';
import mongoose from "mongoose";
import { Model } from "./model.service";
import { Conversation } from "../model";

class ConversationService extends Model {
  protected hidden: any = ['__v', 'password', 'createdBy', 'updatedBy'];
  protected populate: any = [
    { path: 'members', model: 'ConversationMember', strictPopulate: true, populate: { path: 'user',  model: 'User' } },
    { path: 'messages', model: 'ConversationMessage', strictPopulate: true, populate: { path: 'user',  model: 'User' } },
    
  ];
  constructor() {
    super(Conversation);
  }

  getConversations = async (inputs: any, user: any) => {
    const userIds = [user._id];
    const ids = _.map(userIds, (r) => {
      return new mongoose.Types.ObjectId(r);
    })
    const query = [
      {
        $lookup: {
          from: "conversationmembers",
          let: {
            id: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$id", "$conversationId"],
                },
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $addFields: {
                user: { $first: "$user" },
              },
            },
          ],
          as: "members",
        },
      },
      {
        $lookup: {
          from: "conversationmessages",
          localField: "_id",
          foreignField: "conversationId",
          as: "messages",
        },
      },
      {
        $match: {
          "members.userId": new mongoose.Types.ObjectId(user._id)
        }
      }
    ];
    // console.log(query)
    return await this.aggregate(query);
  }
  
}


export const conversationService = new ConversationService();