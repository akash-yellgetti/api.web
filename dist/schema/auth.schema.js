"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const yup_1 = require("yup");
exports.auth = {
    generateOTP: (0, yup_1.object)({
        body: (0, yup_1.object)({
            firstName: (0, yup_1.string)()
                .matches(/^[A-Za-z ]*$/, 'Please enter valid First name')
                .max(40)
                .required('First Name is required'),
            lastName: (0, yup_1.string)()
                .matches(/^[A-Za-z ]*$/, 'Please enter valid Last name')
                .max(40)
                .required('Last Name is required'),
            dob: (0, yup_1.date)().required('Date of birth is required'),
            gender: (0, yup_1.string)().required('Gender is required'),
            mobileNo: (0, yup_1.number)()
                .required('Mobile Number is required')
                .min(1000000000)
                .max(9999999999),
            type: (0, yup_1.string)().required()
        })
    }),
    verifyOTP: (0, yup_1.object)({
        body: (0, yup_1.object)({
            mobileNo: (0, yup_1.number)()
                .required('Mobile Number is required')
                .min(1000000000)
                .max(9999999999),
            no: (0, yup_1.number)().required('OTP is required').min(1000).max(9999)
        })
    }),
    register: (0, yup_1.object)({
        body: (0, yup_1.object)({
            firstName: (0, yup_1.string)()
                .matches(/^[A-Za-z ]*$/, 'Please enter valid First name')
                .max(40)
                .required('First Name is required'),
            lastName: (0, yup_1.string)()
                .matches(/^[A-Za-z ]*$/, 'Please enter valid Last name')
                .max(40)
                .required('Last Name is required'),
            dob: (0, yup_1.date)().required('Date of birth is required'),
            gender: (0, yup_1.string)().required('Gender is required'),
            mobileNo: (0, yup_1.number)()
                .required('Mobile Number is required')
                .min(1000000000)
                .max(9999999999),
            email: (0, yup_1.string)()
                .email('Must be a valid email')
                .required('Email is required'),
            password: (0, yup_1.string)()
                .required('Password is required')
                .min(6, 'Password is too short - should be 6 chars minimum.'),
            passwordConfirmation: (0, yup_1.string)().oneOf([(0, yup_1.ref)('password'), null], 'Passwords must match')
        })
    }),
    login: (0, yup_1.object)({
        body: (0, yup_1.object)({
            email: (0, yup_1.string)()
                .email('Must be a valid email')
                .required('Email is required'),
            password: (0, yup_1.string)()
                .required('Password is required')
                .min(6, 'Password is too short - should be 6 chars minimum.')
        })
    }),
    forgotPassword: (0, yup_1.object)({
        body: (0, yup_1.object)({
            email: (0, yup_1.string)()
                .email('Must be a valid email')
                .required('Email is required'),
            dob: (0, yup_1.date)().required('Date of birth is required'),
            mobileNo: (0, yup_1.number)()
                .required('Mobile Number is required')
                .min(1000000000)
                .max(9999999999)
        })
    }),
    changePassword: (0, yup_1.object)({
        body: (0, yup_1.object)({
            email: (0, yup_1.string)()
                .email('Must be a valid email')
                .required('Email is required'),
            dob: (0, yup_1.date)().required('Date of birth is required'),
            mobileNo: (0, yup_1.number)()
                .required('Mobile Number is required')
                .min(1000000000)
                .max(9999999999),
            password: (0, yup_1.string)()
                .required('Password is required')
                .min(6, 'Password is too short - should be 6 chars minimum.'),
            passwordConfirmation: (0, yup_1.string)().oneOf([(0, yup_1.ref)('password'), null], 'Passwords must match')
        })
    })
};
