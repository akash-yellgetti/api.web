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
                    old: (0, yup_1.object)({
                        date: (0, yup_1.date)().required("Investment Start Date Approx is required"),
                        amount: (0, yup_1.string)().required("Target Investment Amount at the time of start of investment is required"),
                        rate: (0, yup_1.string)().required("Rate Of Interest at the time of start of investment is required"),
                        tenure: (0, yup_1.string)().required("Tenure at the time of start of investment is required"),
                    }),
                    current: (0, yup_1.object)({
                        principalAmount: (0, yup_1.string)().required("Currently Accumlated Investment Amount is required"),
                        amount: (0, yup_1.string)().required("Current Targeted Investment Amount is required"),
                        rate: (0, yup_1.string)().required("Current Rate Of Interest is required"),
                        tenure: (0, yup_1.string)().required("Current Remaining Tenure of investment is required"),
                        isActive: (0, yup_1.string)().required("Current Remaining Tenure of investment is required"),
                    }),
                }),
            })
                .when('type', {
                is: 'investment',
                then: (0, yup_1.object)({
                    old: (0, yup_1.object)({
                        date: (0, yup_1.date)().required("Investment Start Date Approx is required"),
                        amount: (0, yup_1.string)().required("Target Investment Amount at the time of start of investment is required"),
                        rate: (0, yup_1.string)().required("Rate Of Interest at the time of start of investment is required"),
                        tenure: (0, yup_1.string)().required("Tenure at the time of start of investment is required"),
                    }),
                    current: (0, yup_1.object)({
                        principalAmount: (0, yup_1.string)().required("Currently Accumlated Investment Amount is required"),
                        amount: (0, yup_1.string)().required("Current Targeted Investment Amount is required"),
                        rate: (0, yup_1.string)().required("Current Rate Of Interest is required"),
                        tenure: (0, yup_1.string)().required("Current Remaining Tenure of investment is required"),
                        isActive: (0, yup_1.string)().required("Current Remaining Tenure of investment is required"),
                    }),
                }),
            })
                .when('category', {
                is: 'loan',
                then: (0, yup_1.object)({
                    borrowed: (0, yup_1.object)({
                        date: (0, yup_1.date)().required("Loan Borrowed Date Approx is required"),
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
