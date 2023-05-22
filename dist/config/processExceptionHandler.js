"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processExceptionHandler = void 0;
class ProcessExceptionHandler {
    constructor() {
        this.unhandledRejection = (error) => {
            console.log('**************************************************');
            console.log('unhandledRejection', error);
            // throw error;
            console.log('**************************************************');
        };
        this.uncaughtException = (error) => {
            console.log('##################################################');
            console.log('uncaughtException', error);
            // throw error;
            console.log('##################################################');
        };
        this.warning = (error) => {
            console.log('--------------------------------------------------');
            console.log('warning', error);
            console.log('--------------------------------------------------');
        };
    }
}
exports.processExceptionHandler = new ProcessExceptionHandler();
