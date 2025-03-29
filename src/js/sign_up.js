import {loadTemplate, getPageKey, initEssentials, loadJSON} from "./common.js";
import { buildLinkURL } from "./utils.js";
import {loadStepCirclesAndFill} from "./stepper.js";

const navigateStep = (direction, page) => {
    const pageOrder = {
        "first": { "next": "second", "prev": null },
        "second": { "next": "third", "prev": "first" },
        "third": { "next": "fourth", "prev": "second" },
        "fourth": { "next": "home_page", "prev": "third" }
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

const addListenerToPasswordInput = (passwordInput) => {
    let passwordCriteria = {
        length: { regex: /.{8,}/, message: "At least 8 characters long" },
        uppercase: { regex: /[A-Z]/, message: "At least one uppercase letter" },
        number: { regex: /\d/, message: "At least one number" },
        specialChar: { regex: /[@$!%*?&]/, message: "At least one special character (@$!%*?&)" }
    };

    passwordInput.addEventListener("input", () => {
        let unmetCriteria = Object.values(passwordCriteria)
            .filter(criteria => !criteria.regex.test(passwordInput.value))
            .map(criteria => criteria.message);

        if (unmetCriteria.length > 0) {
            passwordInput.setCustomValidity("Password must contain:\n" + unmetCriteria.join("\n"));
        } else {
            passwordInput.setCustomValidity("");
        }

        passwordInput.reportValidity();
    });

};

const addListenerToPasswordConfirmationInput = (repeatPasswordInput) => {
    let passwordInput = document.getElementById("password");
    repeatPasswordInput.addEventListener("input", (evt) => {
        if (passwordInput.value !== repeatPasswordInput.value) repeatPasswordInput.setCustomValidity("Passwords does not match!");
        else repeatPasswordInput.setCustomValidity("");
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
    loadJSON("users.json").then(users => {
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

const fillSignUp = (page) => {
    let firstTitle = document.getElementById("first-title");
    let secondTitle = document.getElementById("second-title");
    let emailInput = document.getElementById("email-placeholder");
    let passwordInput = document.getElementById("password");
    let repeatPasswordInput = document.getElementById("confirm-password");
    let nameInput = document.getElementById("name-placeholder");
    let usernameInput = document.getElementById("username-placeholder");
    let birthDateInput = document.getElementById("birth-date-placeholder");
    let photoText = document.getElementById("photo-text");
    let firstText = document.getElementById("first-text");
    let secondText = document.getElementById("second-text");
    let nextStepButton = document.getElementById("next-step-button");
    let previousStepButton = document.getElementById("previous-step-button");
    let signInInfo = document.getElementById("sign-up-footer-info");
    let loginLink = document.getElementById("login-link");

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
                navigateStep("next", page);
            });

            let firstPart = signup["sign-up-lower-info"]["sign-in-info"];
            let secondPart = signup["sign-up-lower-info"]["login-link"];

            loginLink.textContent = secondPart;
            signInInfo.innerHTML = `${firstPart} <a href="../../pages/html/sign_in.html" id="login-link" class="custom_link"><strong>${secondPart}</strong></a>`;
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
}

await init();
