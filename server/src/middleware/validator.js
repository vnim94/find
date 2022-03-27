const validator = require('validator');

exports.user = (user) => {
    const errors = []
    const { firstName, lastName, location } = user;
    
    if (validator.isEmpty(firstName)) {
        errors.push({
            key: 'firstName',
            message: 'First name must be provided'
        })
    } else if (!validator.isLength(firstName, { min: 2, max: 25 })) {
        errors.push({
            key: 'firstName',
            message: 'First name must be between 2 and 30 characters'
        })
    }

    if (validator.isEmpty(lastName)) {
        errors.push({
            key: 'lastName',
            message: 'Last name must be provided'
        })
    } else if (!validator.isLength(lastName, { min: 2, max: 25 })) {
        errors.push({
            key: 'lastName',
            message: 'Last name must be between 2 and 30 characters'
        })
    }

    if (validator.isEmpty(location)) {
        errors.push({
            key: 'location',
            message: 'Location must be provided'
        })
    }

    return errors;

}

exports.email = (email) => {
    const errors = []
    if (validator.isEmpty(email)) {
        errors.push({
            key: 'email',
            message: 'Email address must not be empty'
        })
    } else if (!validator.isEmail(email)) {
        errors.push({
            key: 'email',
            message: 'Email address provided is invalid'
        })
    }
    return errors;
}

exports.password = (password) => {
    const errors = []
    if (validator.isEmpty(password)) {
        errors.push({
            key: 'password',
            message: 'Password must not be empty'
        })
    } else if (!validator.isLength(password, { min: 5, max: 25 })) {
        errors.push({
            key: 'password',
            message: 'Password must be between 5 and 25 characters'
        })
    }
    return errors;
}