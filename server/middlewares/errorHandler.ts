import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode).json({
        error: {
            code: statusCode,
            message: error.message
        }
    })
}

export default errorHandler