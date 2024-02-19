"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_util_1 = require("./api.util");
const ErrorHandler = (err, req, response, next) => {
    console.log("Middleware Error Hadnling");
    const errStatus = err.statusCode || 500;
    const message = err.message || 'Something went wrong';
    // res.status(errStatus).json({
    //     success: false,
    //     status: errStatus,
    //     message: errMsg,
    //     stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    // })
    return new api_util_1.Api(response).error().code(errStatus).send({ data: null, message });
};
exports.default = ErrorHandler;
