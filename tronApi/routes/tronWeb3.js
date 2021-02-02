var express = require('express');
var router = express.Router();
var webApi = require('../controller/tronweb3');
/* GET home page. */
router.post('/register', webApi.register);
router.post('/buylevel', webApi.buylevel);
router.post('/user',webApi.user);
router.post('/userId',webApi.userId);
router.post('/userX5Matrix',webApi.userX5Matrix);
router.post('/usersx12Matrix',webApi.usersx12Matrix);
router.post('/usersactiveX5Levels',webApi.usersactiveX5Levels);
router.post('/usersactiveX12Levels',webApi.usersactiveX12Levels);

module.exports = router;
