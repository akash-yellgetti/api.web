import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import User, { UserDocument } from "../model/user.model";
class UserService {
    create = async (input: DocumentDefinition<UserDocument>) => {
        return await User.create(input);
    }

    read = (query: any) => {
        return User.findOne(query).lean();
    }

    update = () => {
        
    }

    // Soft Delete
    delete = () => {
        
    }
}


export const userService = new UserService();