const {Router} = require('express')
const authenticateToken = require('../config/authenticateToken')
const user = require('../controllers/user')

const router = Router()

router.get("/", authenticateToken, user)

module.exports = router