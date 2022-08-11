const forenameEl = document.getElementById('firstName')
const surnameEl = document.getElementById('lastName');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');

const form = document.getElementById('form');


const checkForename = () => {

    let valid = false;

    const forename = forenameEl.value.trim();

    if (!isRequired(forename)) {
        showError(forenameEl);
    } else {
        showSuccess(forenameEl);
        valid = true;
    }
    return valid;
};

const checkSurname = () => {

    let valid = false;

    const surname = surnameEl.value.trim();

    if (!isRequired(surname)) {
        showError(surnameEl);
    } else {
        showSuccess(surnameEl);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl);
    } else if (!isEmailValid(email)) {
        showError(emailEl)
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl);
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl);
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;

const showError = (input) => {
    // get the form-field element
    const errorField = input.nextElementSibling;
    // show the error message
    errorField.style.display = "block";
};

const showSuccess = (input) => {
    // get the form-field element
    const errorField = input.nextElementSibling;
    errorField.style.display = "none";
    // remove the error class
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isForenameValid = checkForename(),
        isSurnameValid = checkSurname(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();

    let isFormValid = isForenameValid &&
        isSurnameValid &&
        isEmailValid &&
        isPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'firstName':
            checkForename();
            break;
        case 'lastName':
            checkSurname();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
    }
}));