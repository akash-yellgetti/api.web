class ProcessExceptionHandler {

    constructor() {
        
    }

    unhandledRejection = (error: any) => {
        console.log('**************************************************');
        console.log('unhandledRejection', error)
        // throw error;
        console.log('**************************************************');
    }

    uncaughtException = (error: any) => {
        console.log('##################################################');
        console.log('uncaughtException', error)
        // throw error;
        console.log('##################################################');
    }
    
    warning = (error: any) => {
        console.log('--------------------------------------------------')
        console.log('warning', error)
        console.log('--------------------------------------------------')
    }
}

export const processExceptionHandler = new ProcessExceptionHandler();