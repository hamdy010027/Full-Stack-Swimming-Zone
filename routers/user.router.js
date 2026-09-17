
const express = require('express');

const router = express.Router();

const userController = require('../controller/user_controller');   
const {validationSchema} = require('../middleware/validationSchema');

router.route('/')
                .get(userController.getAllUsers)

router.route('/register')
                .post(validationSchema(), userController.registerUser)

router.route('/login')
                .post(validationSchema(), userController.loginUser)



module.exports = router;