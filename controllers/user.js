const asyncHandler = require('express-async-handler');
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt_token = require('jsonwebtoken');


exports.getInfoUser = asyncHandler( async (req, res) => {

    const {uid} = req.user;

    const rs = await db.User.findByPk(uid, {
        attributes: {
            exclude: ['password']
        }
    });

    return res.json({
        statusCode: rs ? 200 : 400,
        success: rs ? true : false,
        message: rs ? 'Get user current success' : 'Get user failure',
        userCurrent: rs
    })

})