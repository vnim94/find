const validator = require('validator');

exports.user = (user) => {
    const errors = {}
    const { firstName, lastName, location, phone } = user;
    
    if (validator.isEmpty(firstName)) {
        errors['firstName'] = 'First name must be provided';
    } else if (!validator.isLength(firstName, { min: 2, max: 25 })) {
        errors['firstName'] = 'First name must be between 2 and 30 characters';
    }

    if (validator.isEmpty(lastName)) {
        errors['lastName'] = 'Last name must be provided';
    } else if (!validator.isLength(lastName, { min: 2, max: 25 })) {
        errors['lastName'] = 'Last name must be between 2 and 30 characters';
    }

    if (validator.isEmpty(location)) {
        errors['location'] = 'Location must be provided';
    }

    if (!validator.isEmpty(phone) && !validator.isMobilePhone(phone, 'en-AU')) {
        errors['phone'] = 'Phone number must be a valid mobile phone number';
    }

    return errors;
}

exports.email = (email) => {
    if (validator.isEmpty(email)) {
        return { email: 'Email address must not be empty'}
    } else if (!validator.isEmail(email)) {
        return { email: 'Email address provided is invalid' }
    }
}

exports.password = (password) => {
    if (validator.isEmpty(password)) {
        return { password: 'Password must not be empty' } 
    } else if (!validator.isLength(password, { min: 5, max: 25 })) {
        return { password: 'Password must be between 5 and 25 characters' }
    }
}