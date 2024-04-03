import bcrypt from "bcrypt";
import { omit } from "lodash";
import { Model } from "./model.service";
import { User, UserDocument } from "../model";
class UserService extends Model {
    protected hidden: any = ['__v', 'password', 'createdBy', 'updatedBy'];
    protected populate: any = ['contacts'];
    constructor() {
      super(User);
    }

    // read = async (query: any = {}, limit: number = 25, sort: any = { _id: 1 }) => {
    //   return await this.model.find(query).populate("contacts").sort(sort).limit(limit).lean();
    // }

    // readOne = async (query: any) => {
    //   const hidden = this.hidden || [];
    //   // console.log(this.model)
    //   const data = await this.model.findOne(query).populate("contacts").lean();
    //   return omit(data, hidden);
    // }

    public create = async (inputs: any) => {
      try {
        const hashedPassword = await bcrypt.hash(inputs.password, 10);
        inputs.password = hashedPassword;
        return await this.model.create(inputs);
      } catch (error) {
        this.errorHandler(error)
      }
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

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return false;
      }

      return omit(user.toJSON(), "password");
    }
}


export const userService = new UserService();