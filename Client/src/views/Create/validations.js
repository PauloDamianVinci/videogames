const validator = (input) => {
    let errors = {}
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/; // URL válida
    const ratingRegex = /^\d+(\.\d{1,2})?$/ // entero y dos decimales 
    // formato AAAA-MM-DD:
    const releasedRegex = /^(?:19|20)\d\d-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)$/;
    const image = input.image
    const released_date = input.released_date
    const rating = input.rating

    if (!input.name) {
        errors.name = 'Name required';
    }

    if (!input.description) {
        errors.description = 'Description required';
    }

    if (!input.image) {
        errors.image = 'Image: URL required';
    }

    if (!input.released_date) {
        errors.released_date = 'Released date required';
    }

    if (!input.rating) {
        errors.rating = 'Rating required';
    }

    if (input.genre.length === 0) {
        errors.genre = 'Select a genre';
    }

    if (input.platform.length === 0) {
        errors.platform = 'Select a platform';
    }

    if (input.name && input.name.length > 40) {
        errors.name = 'Name: has more than 40 characters';
    }

    if (input.description && input.description.length > 150) {
        errors.description = 'Description: has more than 150 characters';
    }

    if (!urlRegex.test(image)) {
        errors.image = 'Image: URL is not valid';
    }

    if (!releasedRegex.test(released_date)) {
        errors.released_date = 'Released date: incorrect format';
    }

    if (isNaN(rating)) {
        errors.rating = 'Rating not valid';
    }

    if (rating > 10) {
        errors.rating = 'Rating not valid';
    }

    if (rating < 1) {
        errors.rating = 'Rating not valid';
    }

    if (rating < 10 && !ratingRegex.test(rating)) {
        errors.rating = 'Rating not valid';
    }

    if (input.genre.length > 5) {
        errors.genre = 'Indicate maximum 5 genres';
    }

    if (input.platform.length > 5) {
        errors.platform = 'Indicate maximum 5 platforms';
    }
    return errors;
}

export default validator;