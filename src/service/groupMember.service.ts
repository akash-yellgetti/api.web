import { Model } from "./model.service";
import { GroupMember } from "../model";

class GroupMemberService extends Model {
  constructor() {
    super(GroupMember);
  }

  addUsers = async (userIds: any[], groupId: any, userId: any) => {
    const data: any = [];
    for (const i in [...userIds, userId]) {
      if (Object.prototype.hasOwnProperty.call(userIds, i)) {
        data.push({ groupId, userId: userIds[i], createdBy: userId, updatedBy: userId });
      }
    }
    return await this.bulkCreate(data);
  }
}


export const groupMemberService = new GroupMemberService();