const { Router } = require('express');
const router = Router()

const { createUser, loginUser } = require('../contollers/user.controller');

router.post('/login', loginUser);
router.post('/register', createUser);

module.exports = router;