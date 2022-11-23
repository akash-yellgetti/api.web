import { object, string, ref, date, number } from "yup";

export const auth: any = {
    register: object({
        body: object({
            firstName: string().required("First Name is required"),
            lastName: string().required("Last Name is required"),
            dob: date().required("Last Name is required"),
            gender: string().required("Gender is required"),
            mobileNo: number().required("Mobile Number is required").min(1000000000).max(9999999999),
            email: string().email("Must be a valid email").required("Email is required"),
            password: string().required("Password is required").min(6, "Password is too short - should be 6 chars minimum.")
                .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
            passwordConfirmation: string().oneOf([ref("password"), null], "Passwords must match")
        })
    }),
    login: object({
        body: object({
            email: string().email("Must be a valid email").required("Email is required"),
            password: string().required("Password is required").min(6, "Password is too short - should be 6 chars minimum.")
        })
    }),
    generateOTP: object({
        body: object({
            mobileNo: string().required("Mobile Number is required").min(1000000000).max(9999999999),

        })
    }),
    verifyOTP: object({
        body: object({
            mobileNo: string().required("Mobile Number is required").min(1000000000).max(9999999999),
            otp: string().required("OTP is required").min(100000).max(999999),
        })
    }),
    forgotPassword: object({
        body: object({
            password: string().required("Password is required").min(6, "Password is too short - should be 6 chars minimum.")
                .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
            passwordConfirmation: string().oneOf([ref("password"), null], "Passwords must match")
        })
    }),
}