const router = require('express').Router();

const controller = require('../controllers/insert');

router.post('/insert-roles', controller.createRoleInsertFormat);



module.exports = router;