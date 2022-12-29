import { Api } from "./api.util";

const ErrorHandler = (err: any, req: any, response: any, next: any) => {
    console.log("Middleware Error Hadnling");
    const errStatus = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    // res.status(errStatus).json({
    //     success: false,
    //     status: errStatus,
    //     message: errMsg,
    //     stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    // })
    return new Api(response).error().code(errStatus).send({ data:  null, message });
}

export default ErrorHandler;