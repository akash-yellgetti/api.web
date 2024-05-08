import { omit } from "lodash";
import { log } from "../utils";
import bcrypt from "bcrypt";
import _ from "lodash";
import { query } from "express";

export class Model {
  protected model: any;
  protected hidden: any = [];
  protected populate: any = [];

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

  read = async (query: any = {}, limit: number = 25, sort: any = { _id: 1 }) => {
    try {
      return await this.model.find(query).populate(this.populate).sort(sort).limit(limit).lean();
    } catch (error) {
      this.errorHandler(error)
    }
  }

  readOne = async (query: any) => {
    const hidden = this.hidden || [];
    // console.log(this.model)
    const data = await this.model.findOne(query).populate(this.populate).lean();
    return omit(data, hidden);
  }

  update = async (where: any, updateData: any) => {
    return await this.model.updateMany(where, updateData, {
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

  // Soft Delete One
  hardDeleteOne = async (where: any) => {
    return await this.model.deleteOne(where);
  }

  // Soft Delete
  hardDeleteMany = async (where: any) => {
    return await this.model.deleteMany(where);
  }

  // Soft Delete
  softDelete = async (where: any, updateData: any) => {
    return await this.model.findOneAndUpdate(where, updateData, {
      new: true,
      upsert: true // Make this update into an upsert
    });
  }

  // Aggregate
  aggregate = async (query: any) => {
    try {
      return await this.model.aggregate(query).exec();
    } catch (error) {
      this.errorHandler(error)
    }
  }

  // Aggregate One
  aggregateOne = async (query: any, condition: any) => {
    try {
      const data: any = await this.aggregate(query);
      return _.find(data, condition);
    } catch (error) {
      this.errorHandler(error)
    }
  }

  errorHandler = (error: any) => {
    log.error(error);
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