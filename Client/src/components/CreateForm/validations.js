const validations = (input) => {
    let errors = {};
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/; // url válida
    const ratingRegex = /^\d+(\.\d{1,2})?$/ // entero y dos decimales 
    const releasedRegex = /^\d{4}-\d{2}-\d{2}$/ // formato AAAA-MM-DD

    const image = input.image;
    const released_date = input.released_date;
    const rating = input.rating;

    console.log("validando ", input);


    if (!input.name) {
        errors.name = 'Name missing';
    }

    if (!input.description) {
        errors.description = 'Description missing';
    }

    if (!input.image) {
        errors.image = 'Url image missing';
    }

    if (!input.released_date) {
        errors.released_date = 'Released date missing';
    }

    if (!input.rating) {
        errors.rating = 'Rating missing';
    }

    if (input.genre.length === 0) {
        errors.genre = 'Select a genre';
    }

    if (input.platform.length === 0) {
        errors.platform = 'Select a platform';
    }

    if (input.name && input.name.length > 40) {
        errors.name = 'Name has more than 40 characters';
    }

    if (input.description && input.description.length > 150) {
        errors.description = 'Description has more than 150 characters';
    }

    if (!urlRegex.test(image)) {
        errors.image = 'Image: The URL is not valid';
    }

    if (!releasedRegex.test(released_date)) {
        errors.released_date = 'Released date: format error';
    }

    if (rating > 10) {
        errors.rating = 'Rating not valid';
    }

    if (rating < 10 && !ratingRegex.test(rating)) {
        errors.rating = 'Rating not valid';
    }

    if (input.genre.length > 5) {
        errors.genre = 'Max. 5 genres';
    }

    if (input.platform.length > 5) {
        errors.platform = 'Max 5 platforms';
    }
    return errors;
}
export default validations;