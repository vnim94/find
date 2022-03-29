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

exports.company = (company) => {
    const errors = {}
    const { name, headquarters } = company

    if (validator.isEmpty(name)) {
        errors['name'] = 'Name must be provided';
    } else if (!validator.isLength(name, { min: 2, max: 25 })) {
        errors['name'] = 'Name must be between 2 and 25 characters';
    }

    if(validator.isEmpty(headquarters)) {
        errors['headquarters'] = 'Headquarters must be provided';
    } 

    return errors
}

exports.job = (job) => {
    const errors = {}
    const { title, description, city, industry, profession, workType } = job;

    if (validator.isEmpty(title)) {
        errors['title'] = 'Title must be provided';
    } else if (!validator.isLength(title, { min: 5, max: 30 })) {
        errors['title'] = 'Title must be between 5 and 30 characters';
    }

    if (validator.isEmpty(description)) {
        errors['description'] = 'Description must be provided';
    } else if (!validator.isLength(description, { min: 5, max: 4000 })) {
        errors['description'] = 'Description must between 5 and 4000 characters';
    }

    if (validator.isEmpty(city)) {
        errors['city'] = 'City must be provided';
    }

    if (validator.isEmpty(industry)) {
        errors['industry'] = 'Industry must be provided';
    }

    if (validator.isEmpty(profession)) {
        errors['profession'] = 'Profession must be provided';
    }

    if (validator.isEmpty(workType)) {
        errors['workType'] = 'Work type must be provided';
    }
    
    return errors
}