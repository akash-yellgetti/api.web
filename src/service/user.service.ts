import bcrypt from "bcrypt";
import { omit } from "lodash";
import { Model } from "./model.service";
import { User, UserDocument } from "../model";
import path from "path";
import { match } from "assert";
class UserService extends Model {
  protected hidden: any = ['__v', 'password', 'createdBy', 'updatedBy'];
  protected populate: any = [
    {
      path: 'contacts',
      model: 'Contact',
      strictPopulate: false,
      populate: [
        { path: 'user', model: 'User' },
        { path: 'refUser', model: 'User' }
      ]
    },
    {
      path: 'sockets',
      match: { isActive: 1 }
    }
  ];
  constructor() {
    super(User);
  }

  public create = async (inputs: any) => {
    try {
      const hashedPassword = await bcrypt.hash(inputs.password, 10);
      inputs.password = hashedPassword;
      return await this.model.create(inputs);
    } catch (error) {
      this.errorHandler(error);
    }
  };

  validatePassword = async ({
    email,
    password
  }: {
    email: UserDocument['email'];
    password: string;
  }) => {
    const user = await User.findOne({ email });

    if (!user) {
      return false;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return false;
    }

    return omit(user.toJSON(), 'password');
  };
}


export const userService = new UserService();