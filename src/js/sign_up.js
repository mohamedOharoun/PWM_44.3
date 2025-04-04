import {loadTemplate, getPageKey, initEssentials, loadJSON, getUsers} from "./common.js";
import {buildLinkURL} from "./utils.js";
import {loadStepCirclesAndFill} from "./stepper.js";

const navigateStep = (direction, page) => {
    const pageOrder = {
        "first": {"next": "second", "prev": null},
        "second": {"next": "third", "prev": "first"},
        "third": {"next": "fourth", "prev": "second"},
        "fourth": {"next": "home_page", "prev": "third"}
    };

    let targetPageKey = pageOrder[page]?.[direction];

    if (targetPageKey) {
        if (targetPageKey === "home_page") {
            window.location.href = "home_page.html";
        } else {
            window.location.href = buildLinkURL(window.location.href, "page_key", targetPageKey).toString();
        }
    } else {
        console.error(`No se encontró la página ${direction === "next" ? "siguiente" : "anterior"}.`);
    }
};

const passwordCriteria = {
    length: {regex: /.{8,}/, message: "At least 8 characters long"},
    uppercase: {regex: /[A-Z]/, message: "At least one uppercase letter"},
    number: {regex: /\d/, message: "At least one number"},
    specialChar: {regex: /[@$!%*?&]/, message: "At least one special character (@$!%*?&)"}
};

const evaluatePasswordStrength = (password) => {
    return Object.values(passwordCriteria).reduce((strength, criteria) =>
        criteria.regex.test(password) ? strength + 25 : strength, 0);
};

const updateStrengthBar = (barElement, strength) => {
    barElement.style.width = `${strength}%`;
    barElement.style.backgroundColor = strength <= 25 ? "red" :
        strength <= 50 ? "orange" :
            strength <= 75 ? "yellow" : "green";
};

const validatePassword = (passwordInput) => {
    let unmetCriteria = Object.values(passwordCriteria)
        .filter(criteria => !criteria.regex.test(passwordInput.value))
        .map(criteria => criteria.message);

    passwordInput.setCustomValidity(unmetCriteria.length > 0
        ? "Password must contain:\n" + unmetCriteria.join("\n")
        : "");
    passwordInput.reportValidity();
};

const addListenerToPasswordInput = (passwordInput) => {
    const passwordStrengthBar = document.getElementById("password-strength");

    passwordInput.addEventListener("input", () => {
        validatePassword(passwordInput);
        const strength = evaluatePasswordStrength(passwordInput.value);
        updateStrengthBar(passwordStrengthBar, strength);
    });
};

const addListenerToPasswordConfirmationInput = (repeatPasswordInput) => {
    let passwordInput = document.getElementById("password");
    const confirmStrengthBar = document.getElementById("confirm-strength");

    repeatPasswordInput.addEventListener("input", () => {
        const password = passwordInput.value;
        const repeatPassword = repeatPasswordInput.value;

        if (repeatPassword.length === 0) {
            updateStrengthBar(confirmStrengthBar, 0);
            repeatPasswordInput.setCustomValidity("");
            return;
        }

        const matchStrength = password.startsWith(repeatPassword)
            ? (repeatPassword.length / password.length) * 100
            : 0;

        updateStrengthBar(confirmStrengthBar, matchStrength);
        repeatPasswordInput.setCustomValidity(password !== repeatPassword ? "Passwords do not match!" : "");
        repeatPasswordInput.reportValidity();
    });
};

const addListenerToEmailInput = (emailInput) => {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailInput.addEventListener("input", (evt) => {
        if (!emailPattern.test(emailInput.value)) emailInput.setCustomValidity("Invalid e-mail address!");
        else emailInput.setCustomValidity("");
        emailInput.reportValidity();
    });
};


const checkUserAvailability = (inputElement, key) => {
    getUsers().then(users => {
        inputElement.addEventListener("input", () => {
            const inputValue = inputElement.value.trim();
            const exists = Object.values(users).some(user => user[key] === inputValue);

            if (exists) {
                inputElement.setCustomValidity(`${key === "name" ? "Username" : "Email"} already exists!`);
            } else {
                inputElement.setCustomValidity("");
            }
            inputElement.reportValidity();
        });
    });
};

const addListenerToBirthDateInput = (birthDateInput) => {
    birthDateInput.addEventListener("input", () => {
        const birthDate = new Date(birthDateInput.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            birthDateInput.setCustomValidity("You must be at least 18 years old to register.");
        } else {
            birthDateInput.setCustomValidity("");
        }
        birthDateInput.reportValidity();
    });
};

const validateTermsAgreement = () => {
    const termsCheckboxes = document.querySelectorAll(".terms");
    return Array.from(termsCheckboxes).every(checkbox => checkbox.checked);
};

const checkFormValidity = () => {
    const inputs = document.querySelectorAll("input");
    let allValid = true;
    let emptyFields = false;

    inputs.forEach(input => {
        if (!input.value.trim() && input.required) {
            emptyFields = true;
        }
        if (!input.checkValidity()) {
            allValid = false;
        }
    });

    if (emptyFields) {
        alert("Please fill in the fields.");
        return false;
    }

    if (!validateTermsAgreement()) {
        alert("You must accept all terms and conditions to proceed.");
        return false;
    }

    return allValid;
};

const getNextUserID = () => {
    let localUsers = localStorage.getItem("users");
    let localUsersObject = JSON.parse(localUsers ? localUsers : "{}");
    let keys = Object.keys(localUsersObject);
    if (keys.length > 0) {
        let currentID = Math.max(...keys.map(k => parseInt(k)));
        return (currentID + 1).toString();
    }
    return "101";
};

const buildCurrentUserObjectFrom = (userData) => {
    let user = {};
    userData["friends"] = [];
    userData["blocked"] = [];
    userData["groups"] = [];
    userData["pending"] = [];
    userData["sent-requests"] = [];
    userData["description"] = "";
    userData["liked-events"] = [];
    user[getNextUserID()] = userData;
    return user;
};

const mergeWithLocalUsers = (userData) => {
    let localUsers = localStorage.getItem("users");
    let localUsersObject = localUsers ? JSON.parse(localUsers) : {};
    localUsersObject = {...localUsersObject, ...buildCurrentUserObjectFrom(userData)};
    return localUsersObject;
};

const fillSignUp = (page) => {
    let firstTitle = document.getElementById("first-title");
    let secondTitle = document.getElementById("second-title");
    let emailInput = document.getElementById("email-placeholder");
    let passwordInput = document.getElementById("password");
    let repeatPasswordInput = document.getElementById("confirm-password");
    let nameInput = document.getElementById("name-placeholder");
    let usernameInput = document.getElementById("username-placeholder");
    let birthDateInput = document.getElementById("birth-date-placeholder");
    let photoText = document.querySelector(".upload-label");
    let firstText = document.getElementById("first-text");
    let secondText = document.getElementById("second-text");
    let nextStepButton = document.getElementById("next-step-button");
    let previousStepButton = document.getElementById("previous-step-button");
    let signInInfo = document.getElementById("sign-up-footer-info");
    let loginLink = document.getElementById("login-link");
    let uploadedPhoto = document.getElementById("uploaded-img");

    loadJSON("config.json")
        .then(config => {
            let signup = config["sign-up"];

            if (page && signup[page]) {
                firstTitle.textContent = signup[page]["first-title"];
                secondTitle.textContent = signup[page]["second-title"];
            }

            if (page === "first") {
                emailInput.placeholder = signup["first"]["email-placeholder"];
                passwordInput.placeholder = signup["first"]["first-password-placeholder"];
                repeatPasswordInput.placeholder = signup["first"]["second-password-placeholder"];
                addListenerToEmailInput(emailInput);
                checkUserAvailability(emailInput, "e-mail");
                addListenerToPasswordInput(passwordInput);
                addListenerToPasswordConfirmationInput(repeatPasswordInput);
            } else if (page === "second") {
                nameInput.placeholder = signup["second"]["name-placeholder"];
                usernameInput.placeholder = signup["second"]["username-placeholder"];
                checkUserAvailability(usernameInput, "name");
                birthDateInput.placeholder = signup["second"]["birth-date-placeholder"];
                addListenerToBirthDateInput(birthDateInput);
            } else if (page === "third") {
                photoText.textContent = signup["third"]["photo-text"];
            } else if (page === "fourth") {
                firstTitle.textContent = signup["fourth"]["first-title"];
                secondTitle.textContent = signup["fourth"]["second-title"];
                firstText.textContent = signup["fourth"]["first-text"];
                secondText.textContent = signup["fourth"]["second-text"];
            }

            if (page !== "first") {
                previousStepButton.textContent = signup["sign-up-lower-info"]["previous-step-button"];
                previousStepButton.addEventListener("click", (event) => {
                    event.preventDefault();
                    navigateStep("prev", page);
                });
            }

            nextStepButton.textContent = signup["sign-up-lower-info"]["next-step-button"];
            nextStepButton.addEventListener("click", (event) => {
                event.preventDefault();

                if (checkFormValidity()) {
                    let userData = {};

                    if (page === "first") {
                        userData = {
                            "e-mail": emailInput.value,
                            "password": passwordInput.value
                        };
                    } else if (page === "second") {
                        userData = {
                            "full-name": nameInput.value,
                            "name": usernameInput.value,
                            "birth-date": birthDateInput.value
                        };
                    } else if (page === "third") {
                        userData = {
                            "photo": uploadedPhoto.src
                        };
                    } else {
                        localStorage.setItem("user_id", getNextUserID());
                        localStorage.setItem("users", JSON.stringify(mergeWithLocalUsers(JSON.parse(localStorage.getItem("sign_up_user")))));
                    }

                    let storedUserData = JSON.parse(localStorage.getItem("sign_up_user")) || {};

                    storedUserData = { ...storedUserData, ...userData };

                    localStorage.setItem("sign_up_user", JSON.stringify(storedUserData));

                    navigateStep("next", page);
                } else {
                    alert("Please correct errors before proceeding.");
                }
            });

            let firstPart = signup["sign-up-lower-info"]["sign-in-info"];
            let secondPart = signup["sign-up-lower-info"]["login-link"];

            loginLink.textContent = secondPart;
            signInInfo.innerHTML = `${firstPart} <a href="sign_in.html" id="login-link" class="custom_link"><strong>${secondPart}</strong></a>`;
        });
};

const loadSignUpAndFill = async (page) => {
    await loadTemplate(`sign_up.html`, "sign-up-card-container");
    await loadTemplate(`sign_up_${page}_step_form.html`, "sign-up-card-form");
    fillSignUp(page);
};

const init = async () => {
    await initEssentials();
    await loadSignUpAndFill(getPageKey("first"));
    await loadStepCirclesAndFill();
    if (getPageKey("first") === "third") initializeDragAndDrop();
}

await init();
