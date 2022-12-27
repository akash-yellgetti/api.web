import { object, string, ref, date, number } from "yup";

export const auth: any = {
    generateOTP: object({
        body: object({
            firstName: string().matches(/^[A-Za-z ]*$/, "Please enter valid First name").max(40).required("First Name is required"),
            lastName: string().matches(/^[A-Za-z ]*$/, "Please enter valid Last name").max(40).required("Last Name is required"),
            dob: date().required("Date of birth is required"),
            gender: string().required("Gender is required"),
            mobileNo: number().required("Mobile Number is required").min(1000000000).max(9999999999),
            type: string().required(),

        })
    }),
    verifyOTP: object({
        body: object({
            mobileNo: number().required("Mobile Number is required").min(1000000000).max(9999999999),
            no: number().required("OTP is required").min(1000).max(9999),
        })
    }),
    register: object({
        body: object({
            firstName: string().matches(/^[A-Za-z ]*$/, "Please enter valid First name").max(40).required("First Name is required"),
            lastName: string().matches(/^[A-Za-z ]*$/, "Please enter valid Last name").max(40).required("Last Name is required"),
            dob: date().required("Date of birth is required"),
            gender: string().required("Gender is required"),
            mobileNo: number().required("Mobile Number is required").min(1000000000).max(9999999999),
            email: string().email("Must be a valid email").required("Email is required"),
            password: string().required("Password is required").min(6, "Password is too short - should be 6 chars minimum."),
            passwordConfirmation: string().oneOf([ref("password"), null], "Passwords must match")
        })
    }),
    login: object({
        body: object({
            email: string().email("Must be a valid email").required("Email is required"),
            password: string().required("Password is required").min(6, "Password is too short - should be 6 chars minimum."),
        })
    }),
    forgotPassword: object({
        body: object({
            email: string().email("Must be a valid email").required("Email is required"),
            dob: date().required("Date of birth is required"),
            mobileNo: number().required("Mobile Number is required").min(1000000000).max(9999999999),
        })
    }),
    changePassword: object({
        body: object({
            email: string().email("Must be a valid email").required("Email is required"),
            dob: date().required("Date of birth is required"),
            mobileNo: number().required("Mobile Number is required").min(1000000000).max(9999999999),
            password: string().required("Password is required").min(6, "Password is too short - should be 6 chars minimum."),
            passwordConfirmation: string().oneOf([ref("password"), null], "Passwords must match")
        })
    }),
}