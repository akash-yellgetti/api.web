import { omit } from "lodash";
import { Model } from "./model.service";
import { User, UserDocument } from "../model";
class UserService extends Model {
    protected hidden: any = ['__v', 'isActive', 'password', 'createdBy', 'updatedBy'];
    constructor() {
      super(User);
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