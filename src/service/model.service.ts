import { omit } from "lodash";

export class Model {
  protected model: any;
  protected hidden: any = [];

  constructor(model: any) {
    this.model = model;
  }

  public create = async (inputs: any) => {
    try {
      return await this.model.create(inputs);
    } catch (error) {
      this.errorHandler(error)
    }
  }

  public bulkCreate = async (inputs: any) => {
    try {
      return await this.model.insertMany(inputs);
    } catch (error) {
      this.errorHandler(error)
    }
  }

  read = async (query: any) => {
    try {
      return await this.model.find(query).lean();
    } catch (error) {
      this.errorHandler(error)
    }
  }

  readOne = async (query: any) => {
    const hidden = this.hidden || [];
    // console.log(this.model)
    const data = await this.model.findOne(query).lean();
    return omit(data, hidden);
  }

  update = async (where: any, updateData: any) => {
    return await this.model.update(where, updateData, {
      new: true,
      upsert: true // Make this update into an upsert
    });
  }

  updateOne = async (where: any, updateData: any) => {
    return await this.model.findOneAndUpdate(where, updateData, {
      new: true,
      upsert: true // Make this update into an upsert
    });
  }

  // Soft Delete
  delete = async (where: any, updateData: any) => {
    return await this.model.findOneAndUpdate(where, updateData, {
      new: true,
      upsert: true // Make this update into an upsert
    });
  }

  // Soft Delete
  softDelete = async (where: any, updateData: any) => {
    return await this.model.findOneAndUpdate(where, updateData, {
      new: true,
      upsert: true // Make this update into an upsert
    });
  }


  errorHandler = (error: any) => {
    const res: any = { code: 422, message: null };
    switch (error.code) {
      case 11000:
        res.message = `Duplicate ${JSON.stringify(error.keyValue)} is not allowed`;
        throw res;
        break;
    
      default:
        res.message = 'Data validation failed.';
        res.data = error.errors;
        throw res;
        break;
    }
  }
}