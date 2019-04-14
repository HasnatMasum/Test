const validator = require('validator');

const loginValidator = user => {
    let error = {}


    if (!user.email) {
        error.email = 'Email is required';
    } else if (!validator.isEmail(user.email)) {
        error.email = 'Please provide a valid email';
    }

    if (!user.password) {
        error.password = 'Password is required';
    } else if (user.password.length < 4) {
        error.password = 'Password must be greater or equal 4 character';
    }


    return {
        error,
        isValid: Object.keys(error).length === 0
    }

}

module.exports = loginValidator;