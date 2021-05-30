const express = require('express');
const router = express.Router();
const passport = require('passport');
const { pass } = require('../config/mongoose');

const userController = require('../controllers/user_controller');
const { route } = require('./posts');

router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

//post signup data
router.post('/create',userController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {faliureRedirect: '/users/sign-in'},
),userController.create_session);

router.get('/sign-out',userController.destroySession);

module.exports = router;
