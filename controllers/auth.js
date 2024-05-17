const asyncHandler = require('express-async-handler');
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt_token = require('jsonwebtoken');


exports.register = asyncHandler( async (req, res) => {
    
    const {password, phone, name} = req.body;
    
    const response = await db.User.findOrCreate({
        where: {phone: phone},
        defaults: {password, phone, name}
    });

    const userId = response[0]?.id;
    if (userId) {
        const roleCodes = ['ROLE4'];
        if (req.body?.role) roleCodes.push(req?.body?.role);
        console.log('req.body?.role , ', req.body?.role);
        const roleCodeBulk = roleCodes.map(role => ({userId, roleCode: role}));
        console.log('roleCodeBulk : ', roleCodeBulk);
        const updateRole = await db.User_Role.bulkCreate(roleCodeBulk);
        console.log('updateRole : ', updateRole)
        if (!updateRole) await db.User.destroy({ where: {id: userId} });
    }

    return res.status(200).json({
        statusCode: response[1] ? 201 : 200,
        success: response[1],
        message: response[1] ? 'Your accout is created successfully' : 'Phone number already had exists'
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
