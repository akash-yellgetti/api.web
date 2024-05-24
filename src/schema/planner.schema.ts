import { object, string, ref, date, number } from 'yup';

export const planner: any = {
  create: object({
    body: object({
        type: string().required("Type is required"),
        title: string().required("Title is required"),
        description: string(),
        principalAmount: string().required("Principal Amount is required"),
        amount: string().required("Amount is required"),
        rate: string().required("Rate Of Interest is required"),
        tenure: string().required("Tenure is required"),
    }),
  }),
};