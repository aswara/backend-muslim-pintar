const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin');
const CheckAuth = require('../middleware/check-auth');


router.get( '/', CheckAuth, AdminController.profile );
router.post( '/login', AdminController.login );
router.post( '/register', AdminController.register );

module.exports = router;