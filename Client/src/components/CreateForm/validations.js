const validator = (data) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const numberPattern = /\d/;
    let errors = {}

    if (!data.mail) {
        errors.e1 = 'Enter an email.'
    }
    if (!emailPattern.test(data.mail)) {
        errors.e2 = 'Enter a valid email.'
    }
    if (data.mail.length > 35) {
        errors.e3 = 'It must be less than 36 characters.'
    }
    if (!numberPattern.test(data.password)) {
        errors.p1 = 'It must be at least one number'
    }
    if (data.password.length < 6 || data.password.length > 10) {
        errors.p2 = 'It must have more than 6 and fewer than 10 characters.'
    }

    return errors;
}
export default validator;