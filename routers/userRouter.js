const router = require('express').Router();
const passport = require('passport');
//const jwt = require('jsonwebtoken');
const { register, login, current } = require('../controlars/userControlar');


router.post('/register', register);

router.post('/login', login);

router.get('/current', passport.authenticate('jwt', { session: false }), current);

module.exports = router;