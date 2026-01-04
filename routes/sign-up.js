const {Router} = require('express');
const signUp = require('../controllers/sign-up');

const router = Router();

router.post('/', signUp)

module.exports = router