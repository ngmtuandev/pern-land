const { throwError } = require("./errHandler");

const validateDto = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body);

    if(error) {
        return res.status(403).json({
            success: false,
            mess: error.details[0].message.replaceAll('\"', "")
        })
    }
    next();

}

module.exports = validateDto;