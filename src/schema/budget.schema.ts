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
          tenure: string().required("Tenure is required"),
        }),
      })
      .when('category', {
        is: 'loan',
        then: object({
          borrowedLoanDateTime: number().required("Loan Amount Borrowed Date Approx is required"),
          borrowedLoanAmount: number().required("Loan Amount Borrowed is required"),
          borrowedRate: number().required("Loan Interest Rate When Borrowed is required"),
          borrowedTenure: number().required("Loan Tenure When Borrowed is required"),
          borrowedEMI: number().required("Loan EMI When Borrowed is required"),
          remainingLoanAmount: number().required("Loan Amount Remaining is required"),
          remainingRate: number().required("Loan Current Interest Rate is required"),
          remainingTenure: number().required("Loan Tenure Remaining is required"),
          currentEmi: number().required("Loan Current EMI is required"),
        }),
      }),
    }),
  }),
};