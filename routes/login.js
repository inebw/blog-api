const {Router} = require('express');
const passport = require('passport');
const login = require('../controllers/login');

const router = Router();

router.post('/', passport.authenticate('local', {session:false}), login)

module.exports = router