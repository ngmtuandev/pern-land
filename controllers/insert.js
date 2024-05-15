const asyncHandler = require('express-async-handler');
const db = require('../models');
const { roles } = require('../utils/constance')


exports.createRoleInsertFormat = asyncHandler( async (req, res) => {

    const rs = await db.Role.bulkCreate(roles) // insert mutiple data

    return res.json({
        success: Boolean(rs),
        message: rs ? 'Insert Role Successfully' : 'Some thing went wrong'
    })

})


