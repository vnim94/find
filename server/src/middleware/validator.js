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
<<<<<<< HEAD
}

exports.review = (review) => {
    const errors = {}
    const { title, good, bad, role, location, recommend, salary } = review;

    if (validator.isEmpty(title)) {
        errors['title'] = 'Title must be provided';
    } else if (!validator.isLength(title, { min: 5, max: 30 })) {
        errors['title'] = 'Title must be between 5 and 30 characters';
    }

    if (validator.isEmpty(good)) {
        errors['good'] = 'Must not be empty';
    } else if (!validator.isLength(good, { min: 5, max: 250 })) {
        errors['good'] = 'Must be between 10 and 250 characters';
    }

    if (validator.isEmpty(bad)) {
        errors['bad'] = 'Must not be empty';
    } else if (!validator.isLength(bad, { min: 5, max: 250 })) {
        errors['bad'] = 'Must be between 10 and 250 characters';
    }

    if (validator.isEmpty(role)) {
        errors['role'] = 'Role must be provided';
    } else if (!validator.isLength(role, { min: 5, max: 25 })) {
        errors['role'] = 'Role must be between 5 and 25 characters';
    }

    if (validator.isEmpty(location)) {
        errors['location'] = 'Location must be provided';
    }

    // if (!validator.isBoolean(recommend)) {
    //     errors['recommend'] = 'Must not be empty';
    // }

    if (validator.isEmpty(salary)) {
        errors['salary'] = 'Must not be empty';
    }

    return errors;
}
=======
}
>>>>>>> 22f82ed2674af13861fae1b4381e7538334abb76
