const registerValidator = require('../validator/registerValidator');
const loginValidator = require('../validator/loginValidator');
const User = require('../models/userModel');
const Bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../Keys/keys');

module.exports = {

    login(req, res) {
        let { email, password } = req.body;
        let validate = loginValidator({ email, password });
        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        } else {
            User.findOne({ email })
                .then(user => {
                    if (!user) {
                        return res.status(404).json({ email: 'User not found' })
                    }

                    //check password
                    Bcrypt.compare(password, user.password)

                    .then(isMatch => {

                        if (isMatch) {
                            //Creat payload
                            const payload = {
                                id: user.id,
                                name: user.name
                            }

                            jwt.sign(payload, keys.secret, { expiresIn: '2h' }, (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            })
                        } else {
                            //validate.error.password = 'Password incorrect'
                            res.status(400).json({ password: 'Password incorrect' })
                        }
                    })

                })
                .catch(err => console.log(err))
        }

    },
    // Register Controlar
    register(req, res) {
        let { name, email, password, password2 } = req.body;
        let validate = registerValidator({ name, email, password, password2 });

        if (!validate.isValid) {
            return res.status(400).json(validate.error);
        } else {

            User.findOne({ email })
                .then(user => {
                    if (user) {
                        res.status(400).json({ email: 'Email alredy exist' })
                    } else {
                        let newUser = new User({
                            name,
                            email,
                            password,
                            password2
                        })
                        Bcrypt.genSalt(10, (err, salt) => {
                            if (err) throw err;
                            Bcrypt.hash(newUser.password, salt, (err, hash) => {
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => res.json(user))
                                    .catch(err => console.log(err))
                            })

                        })
                    }
                })
        }

    },

    current(req, res) {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        })
    }
}