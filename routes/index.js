const express = require('express');

const router = express.Router();
const homeControleer = require('../controllers/home_controller');

console.log('router loaded');

router.get('/',homeControleer.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

//for any further routes, acess from here
//router.use('/routername', require('./routerfile'));

module.exports = router;