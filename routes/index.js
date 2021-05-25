const express = require('express');

const router = express.Router();
const homeControleer = require('../controllers/home_controller');

console.log('router loaded');

router.get('/',homeControleer.home);

module.exports = router;