const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const CheckAuth = require('../middleware/check-auth');


router.get( '/', CheckAuth, UserController.profile );
router.post( '/login', UserController.login );
router.post( '/register', UserController.register );
router.get( '/answer/true', CheckAuth, UserController.true );
router.get( '/answer/false', CheckAuth, UserController.false );
router.get( '/level', CheckAuth, UserController.level );

module.exports = router;