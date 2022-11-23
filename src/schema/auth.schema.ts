import { object, string, ref, date } from "yup";

export const auth: any = {
    register: {
        firstName: string().required("First Name is required"),
        lastName: string().required("Last Name is required"),
        dob: date().required("Last Name is required"),
        gender: string().required("Last Name is required"),
        mobileNo: string().required("Mobile Number is required").min(1000000000).max(9999999999),
        email: string().email("Must be a valid email").required("Email is required"),
        password: string().required("Password is required").min(6, "Password is too short - should be 6 chars minimum.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
        passwordConfirmation: string().oneOf([ref("password"), null],"Passwords must match")
    },
    login: object({
        body: object({
            email: string().email("Must be a valid email").required("Email is required"),
            password: string().required("Password is required").min(6, "Password is too short - should be 6 chars minimum.")
        })
    }),
    generateOTP: {
        mobileNo: string().required("Mobile Number is required").min(1000000000).max(9999999999),
        
    },
    verifyOTP: {

    },
    forgotPassword: {

    }
}