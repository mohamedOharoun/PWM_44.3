import { loadTemplate } from "./main.js";

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
    let nextStepButton = document.getElementById("next-step-button");
    let previousStepButton = document.getElementById("previous-step-button");
    let signInInfo = document.getElementById("sign-up-footer-info");

    fetch("../../db/config.json")
        .then(res => res.json())
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
            } else if (page === "second") {
                nameInput.placeholder = signup["second"]["name-placeholder"];
                usernameInput.placeholder = signup["second"]["username-placeholder"];
                birthDateInput.placeholder = signup["second"]["birth-date-placeholder"];
            } else if (page === "third") {
                photoText.textContent = signup["third"]["photo-text"];
            } else if (page === "fourth") {
                firstTitle.textContent = signup["fourth"]["first-title"];
                secondTitle.textContent = signup["fourth"]["second-title"];
            }

            if (page !== "first") {
                previousStepButton.textContent = signup["sign-up-lower-info"]["previous-step-button"];
            }
            nextStepButton.textContent = signup["sign-up-lower-info"]["next-step-button"];
            signInInfo.textContent = signup["sign-up-lower-info"]["sign-in-info"];
        });
};

const loadSignUpAndFill = async (page) => {
    const template = `../../templates/html/sign_up_${page}_step.html`;
    await loadTemplate(template, "sign-up-card-container");
    const form = `../../templates/html/sign_up_${page}_step_form.html`;
    await loadTemplate(form, "sign-up-card-form");

    fillSignUp(page);
};


const pagePath = window.location.pathname.split("/").pop().replace(".html", "");

let pageKey = "";
if (pagePath === "sign_up_first_step_page") {
    pageKey = "first";
} else if (pagePath === "sign_up_second_step_page") {
    pageKey = "second";
} else if (pagePath === "sign_up_third_step_page") {
    pageKey = "third";
} else if (pagePath === "sign_up_fourth_step_page") {
    pageKey = "fourth";
}

if (pageKey) {
    loadSignUpAndFill(pageKey);
}

const loadHeaderAndFill = async () => {
    await loadTemplate("../../templates/html/header.html", "page-header");
};

loadHeaderAndFill();