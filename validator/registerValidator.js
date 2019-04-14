const validator = require('validator');

const registerValidator = user => {
    let error = {}

    if (!user.name) {
        error.name = 'Name field required';
    } else if (user.name.length < 3 || user.name.length > 20) {
        error.name = 'Name must be between 3 and 20 character';
    }

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

    if (!user.password2) {
        error.password2 = 'Confirm password is required';
    } else if (user.password !== user.password2) {
        error.password2 = 'Password dosn\'t match';
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }

}

module.exports = registerValidator;