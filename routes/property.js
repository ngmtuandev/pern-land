const router = require('express').Router();
const controller = require('../controllers/property');
const redisWithLimitSpam = require('../middlewares/redisWithLimitSpam')

router.use(redisWithLimitSpam) // call redisWithLimitSpam


router.get('/get-properties', controller.getProperties);






module.exports = router;