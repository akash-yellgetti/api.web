import { Model } from "./model.service";
import { Categories } from "../model";

class CategoriesService extends Model {
  constructor() {
    super(Categories);
  } 
}


export const categoriesService = new CategoriesService();