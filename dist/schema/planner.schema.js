"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planner = void 0;
const yup_1 = require("yup");
exports.planner = {
    create: (0, yup_1.object)({
        body: (0, yup_1.object)({
            type: (0, yup_1.string)().required("Type is required"),
            title: (0, yup_1.string)().required("Title is required"),
            description: (0, yup_1.string)(),
            principalAmount: (0, yup_1.string)().required("Principal Amount is required"),
            amount: (0, yup_1.string)().required("Amount is required"),
            rate: (0, yup_1.string)().required("Rate Of Interest is required"),
            tenure: (0, yup_1.string)().required("Tenure is required"),
        }),
    }),
};
