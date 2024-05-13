const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    
    const token = req?.headers?.authorization?.startsWith('Bearer');
    if (!token) {
        return res?.status(401).json({
            statusCode: 401,
            message: 'User not accept'
        })
    }


    const tokenReal = req.headers?.authorization?.split(' ')[1];

    jwt.verify(tokenReal, process.env.JWT_SECRET, (err, decode) => {
        if(err) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Creds invalid !'
            })
        }
        req.user = decode;
        next();
    })

}
