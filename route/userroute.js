const express = require('express')
const router = express.Router();
const control = require('../controller/usercontroller');
// const controller = require('../controller/authController')
router.post('/insert',control.insert);
router.post('/login',control.login);
router.get('/profile',control.profile);
router.get('/profile/id',control.getid);
// router.get('/profile/:author)
module.exports = router;