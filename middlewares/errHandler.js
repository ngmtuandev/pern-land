
const errHandler = (error, req, res, next) => {
    
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    return req.status(statusCode).json({
        success: false,
        mess: error.message
    })
}

const throwError = (code, mess) => {
    const error = new Error(mess);
    error.code = code;

    throw error; 

}

const badRequestExeption  = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found !`);
    res.status(404);
    next(error);
}

module.exports = {
    errHandler,
    throwError,
    badRequestExeption
}