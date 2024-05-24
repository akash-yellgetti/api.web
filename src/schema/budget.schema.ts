import { object, string, ref, date, number } from 'yup';

export const budget: any = {
  create: object({
    body: object({
      type: string().required("Type is required"),
      category: string().required("Category is required"),
      subcategory: string().required("Sub-Category is required"),
      title: string().required("Title is required"),
      description: string(),
      amount: string().required("Amount is required"),
    }),
  }),
};