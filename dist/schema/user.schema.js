"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSessionSchema = exports.createUserSchema = exports.user = void 0;
const yup_1 = require("yup");
exports.user = [];
exports.createUserSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        firstName: (0, yup_1.string)().required("Name is required"),
        lastName: (0, yup_1.string)().required("Name is required"),
        email: (0, yup_1.string)()
            .email("Must be a valid email")
            .required("Email is required"),
        password: (0, yup_1.string)()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        passwordConfirmation: (0, yup_1.string)().oneOf([(0, yup_1.ref)("password"), null], "Passwords must match"),
    }),
});
exports.createUserSessionSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        password: (0, yup_1.string)()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        email: (0, yup_1.string)()
            .email("Must be a valid email")
            .required("Email is required"),
    }),
});
