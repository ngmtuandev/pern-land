const router = require('express').Router();

const controller = require('../controllers/user');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/user-current', verifyToken, controller.getInfoUser);




module.exports = router;