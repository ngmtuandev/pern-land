const router = require('express').Router();

const Joi = require('joi');
const controller = require('../controllers/auth');
const validateDto = require('../middlewares/validation');
const { stringRequired, numberRequired } = require('../middlewares/joiSchema');

router.post('/register', validateDto(Joi.object(
    {
        password: stringRequired,
        phone: numberRequired,
        name: stringRequired,
        role: stringRequired
    }
)), controller.register);

router.post('/sign-in', validateDto(Joi.object(
    {
        password: stringRequired,
        phone: numberRequired,
    }
)), controller.signIn);



module.exports = router;