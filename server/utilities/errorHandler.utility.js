class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = ErrorHandler;

/*
Without Error.captureStackTrace:-
if you didn't use this line, the error report would include unnecessary information about the ErrorHandler constructor itself, making it harder to identify the actual source of the error.

By using Error.captureStackTrace(this, this.constructor);, you ensure that the stack trace starts from the point where the error was created, providing a clearer and more relevant error report.
*/