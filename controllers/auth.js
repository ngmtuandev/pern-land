const asyncHandler = require('express-async-handler');
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt_token = require('jsonwebtoken');


exports.register = asyncHandler( async (req, res) => {
    
    const {password, phone, name, role} = req.body;
    
    console.log('role code : ', role);

    const checkUser = await db.User.findOrCreate({
        where: {phone: phone},
        defaults: {password, phone, name, roleCode: role}
    })

    return res.status(200).json({
        statusCode: checkUser[1] ? 201 : 200,
        success: checkUser[1],
        message: checkUser[1] ? 'Your accout is created successfully' : 'Phone number already had exists'
    })

})

exports.signIn = asyncHandler( async (req, res) => {

    try {
        const {password, phone} = req.body;

        const findUserCreated = await db.User.findOne({
            where: {phone}
        })
    

    if (!findUserCreated) {
        return res.status(403).json({
            statusCode: 403,
            message: 'User not found'
        })
    }

    const isMatchingPassword = bcrypt.compareSync(password, findUserCreated.password);

    if (!isMatchingPassword) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Password user not matching'
        })
    }

    const token = jwt_token.sign({
        uid: findUserCreated.id,
        role: findUserCreated.role
    }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
        statusCode: 200,
        message: 'Login successfully !',
        accessToken: token
    });
    } catch (error) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Login failure !'
        });
    }

})
