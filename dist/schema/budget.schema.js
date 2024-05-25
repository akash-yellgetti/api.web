"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budget = void 0;
const yup_1 = require("yup");
exports.budget = {
    create: (0, yup_1.object)({
        body: (0, yup_1.object)({
            type: (0, yup_1.string)().required("Type is required"),
            category: (0, yup_1.string)().required("Category is required"),
            subcategory: (0, yup_1.string)().required("Sub-Category is required"),
            title: (0, yup_1.string)().required("Title is required"),
            description: (0, yup_1.string)(),
            amount: (0, yup_1.string)().required("Amount is required"),
            planner: (0, yup_1.object)()
                .when('type', {
                is: 'goal',
                then: (0, yup_1.object)({
                    principalAmount: (0, yup_1.string)().required("Principal Amount is required"),
                    amount: (0, yup_1.string)().required("Amount is required"),
                    rate: (0, yup_1.string)().required("Rate Of Interest is required"),
                    tenure: (0, yup_1.string)().required("Tenure is required"),
                }),
            })
                .when('type', {
                is: 'investment',
                then: (0, yup_1.object)({
                    principalAmount: (0, yup_1.string)().required("Principal Amount is required"),
                    amount: (0, yup_1.string)().required("Amount is required"),
                    rate: (0, yup_1.string)().required("Rate Of Interest is required"),
                    isActive: (0, yup_1.number)().required("Is Active is required"),
                    tenure: (0, yup_1.string)().when('isActive', {
                        is: 1,
                        then: (0, yup_1.object)({
                            date: (0, yup_1.number)().required("Start Date Approx is required"),
                            // tenure: string().required("Tenure is required"),
                        }),
                    }),
                }),
            })
                .when('category', {
                is: 'loan',
                then: (0, yup_1.object)({
                    borrowed: (0, yup_1.object)({
                        date: (0, yup_1.number)().required("Loan Borrowed Date Approx is required"),
                        principalAmount: (0, yup_1.string)().required("Loan Amount Paid is required"),
                        amount: (0, yup_1.string)().required("Loan Amount Borrowed is required"),
                        rate: (0, yup_1.string)().required("Rate Of Interest When Borrowed is required"),
                        tenure: (0, yup_1.string)().required("Tenure When Borrowed is required"),
                        emi: (0, yup_1.string)().required("Loan EMI When Borrowed is required"),
                    }),
                    current: (0, yup_1.object)({
                        principalAmount: (0, yup_1.string)().required("Principal Amount is required"),
                        amount: (0, yup_1.string)().required("Amount is required"),
                        rate: (0, yup_1.string)().required("Rate Of Interest is required"),
                        tenure: (0, yup_1.string)().required("Tenure is required"),
                        emi: (0, yup_1.string)().required("Loan Current EMI is required"),
                    }),
                }),
            }),
        }),
    }),
};
