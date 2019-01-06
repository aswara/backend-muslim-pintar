const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const CheckAuth = require('../middleware/check-auth');


router.get( '/', CheckAuth ,UserController.profile );
router.post( '/login', UserController.login );
router.post( '/register', UserController.register );


module.exports = router;