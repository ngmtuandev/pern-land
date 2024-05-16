const router = require('express').Router();
const validateDTO = require('../middlewares/validation');
const joi = require('joi');
const controller = require('../controllers/propertyType');
const { stringRequired, string } = require('../middlewares/joiSchema');
const { verifyToken, checkRoleAdmin, checkRoleAgent, checkRoleOwnerProperty } = require('../middlewares/verifyToken');
const redisWithLimitSpam = require('../middlewares/redisWithLimitSpam')

router.use(redisWithLimitSpam) // call redisWithLimitSpam

router.post('/create-new', verifyToken, checkRoleAdmin, validateDTO(joi.object({
    name: string,
    image:stringRequired,
    description: stringRequired
})), controller.createNewPropertyType);

router.get('/get-propertypes', controller.getPropertyTypes);

router.patch('/update/:id', verifyToken, checkRoleAdmin, validateDTO(joi.object({
    name: string,
    image:string,
    description: string
})), controller.updatePropertyType);

router.patch('/delete/:id', verifyToken, checkRoleAdmin, controller.removePropertyType);





module.exports = router;