"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.group = void 0;
const yup_1 = require("yup");
exports.group = {
    create: (0, yup_1.object)({
        body: (0, yup_1.object)({
            name: (0, yup_1.string)().required("Name is required"),
        }),
    }),
    read: {
        body: (0, yup_1.object)({
            id: (0, yup_1.string)().required("ID is required"),
        }),
    },
    update: (0, yup_1.object)({
        body: (0, yup_1.object)({
            id: (0, yup_1.string)().required("ID is required"),
            name: (0, yup_1.string)().required("Name is required"),
        }),
    }),
    addUser: (0, yup_1.object)({
        body: (0, yup_1.object)({
            id: (0, yup_1.string)().required("ID is required"),
            userId: (0, yup_1.string)().required("User is required"),
        }),
    }),
    removeUser: (0, yup_1.object)({
        body: (0, yup_1.object)({
            id: (0, yup_1.string)().required("ID is required"),
            name: (0, yup_1.string)().required("Name is required"),
        }),
    }),
    delete: {}
};
