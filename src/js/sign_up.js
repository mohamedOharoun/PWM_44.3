import { loadTemplate, getPageKey } from "./common.js";
import { buildLinkURL } from "./utils.js";

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
            window.location.href = buildLinkURL(window.location.href, "page_key", targetPageKey);
        }
    } else {
        console.error(`No se encontró la página ${direction === "next" ? "siguiente" : "anterior"}.`);
    }
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
    await loadTemplate(`sign_up_${page}_step_form.html`, "sign-up-card-form", () => {
        fillSignUp(page);
    });
};

const loadHeaderAndFooter = async () => {
    await loadTemplate("../../templates/html/footer.html", "page-footer");
    await loadTemplate("../../templates/html/header.html", "page-header");
};

const pageKey = getPageKey("first");
loadSignUpAndFill(pageKey);
loadHeaderAndFooter();