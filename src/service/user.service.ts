import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import User, { UserDocument } from "../model/user.model";
class UserService {
    create = async (input: DocumentDefinition<UserDocument>) => {
      try {
        return await User.create(input);
      } catch(e) {
        throw e;
      }
    }

    read = (query: any) => {
        return User.findOne(query).lean();
    }

    update = () => {
        
    }

    // Soft Delete
    delete = () => {
        
    }

    validatePassword = async ({
      email,
      password,
    }: {
      email: UserDocument["email"];
      password: string;
    }) => {
      const user = await User.findOne({ email });

      if (!user) {
        return false;
      }

      // const isValid = await user.comparePassword(password);
      const isValid = await User.findOne({ email, password });

      if (!isValid) {
        return false;
      }

      return omit(user.toJSON(), "password");
    }
}


export const userService = new UserService();