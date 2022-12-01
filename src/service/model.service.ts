import { omit } from "lodash";

export class Model {
  private model: any;
  protected hidden: any = [];

  constructor(model: any) {
    this.model = model;
  }

  public create = async (inputs: any) => {
    return await this.model.create(inputs);
  }

  read = async (query: any) => {
    return await this.model.find(query).lean();
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
}