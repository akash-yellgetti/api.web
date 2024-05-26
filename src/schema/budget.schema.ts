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
      planner: object()
      .when('type', {
        is: 'goal',
        then: object({
          principalAmount: string().required("Principal Amount is required"),
          amount: string().required("Amount is required"),
          rate: string().required("Rate Of Interest is required"),
          tenure: string().required("Tenure is required"),
        }),
      })
      .when('type', {
        is: 'investment',
        then: object({
          principalAmount: string().required("Principal Amount is required"),
          amount: string().required("Amount is required"),
          rate: string().required("Rate Of Interest is required"),
          isActive: number().required("Is Active is required"),
          tenure: string().when('isActive', {
            is: 1,
            then: object({
              date: number().required("Start Date Approx is required"),
              // tenure: string().required("Tenure is required"),
            }),
          }),
          
        }),
      })
      .when('category', {
        is: 'loan',
        then: object({
          borrowed: object({
            date: date().required("Loan Borrowed Date Approx is required"),
            principalAmount: string().required("Loan Amount Paid is required"),
            amount: string().required("Loan Amount Borrowed is required"),
            rate: string().required("Rate Of Interest When Borrowed is required"),
            tenure: string().required("Tenure When Borrowed is required"),
            emi: string().required("Loan EMI When Borrowed is required"),
          }),
          current: object({
            principalAmount: string().required("Principal Amount is required"),
            amount: string().required("Amount is required"),
            rate: string().required("Rate Of Interest is required"),
            tenure: string().required("Tenure is required"),
            emi: string().required("Loan Current EMI is required"),
          }),
        }),
      }),
    }),
  }),
};