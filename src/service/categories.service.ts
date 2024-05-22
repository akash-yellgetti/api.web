import { Model } from "./model.service";
import { Categories } from "../model";

class CategoriesService extends Model {
  protected populate: any = [
    { 
      path: 'subcategories', model: 'Categories', strictPopulate: false, 
    }
  ];
  constructor() {
    super(Categories);
  } 
}


export const categoriesService = new CategoriesService();