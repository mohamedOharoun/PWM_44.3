import { loadTemplate} from "./common.js";

await loadTemplate("../../templates/html/footer.html", "page-footer");

const fillLogin = () => {
    let logoImage = document.getElementById("logo-image");
    let title = document.getElementById("sign-in-title");
    let emailInput = document.getElementById("email-input");
    let passwordInput = document.getElementById("password-input");
    const keepLoggedLabel = document.getElementById("keep-logged-label");
    let forgotPasswordLink = document.getElementById("forgot-password-link");
    let registerLink = document.getElementById("register-link");
    let signInButton = document.getElementById("sign-in-btn");

    fetch("../../db/config.json")
        .then(res => res.json())
        .then(config => {
            let loginTexts = config["login"];

            logoImage.alt = loginTexts["logo-alt"];
            title.textContent = loginTexts["title"];
            emailInput.placeholder = loginTexts["placeholders"]["email"];
            passwordInput.placeholder = loginTexts["placeholders"]["password"];
            keepLoggedLabel.firstChild.textContent = loginTexts["options"]["keep-logged-in"];
            forgotPasswordLink.textContent = loginTexts["options"]["forgot-password"];
            registerLink.textContent = loginTexts["options"]["register"];
            signInButton.textContent = loginTexts["button-text"];
        });
};


const loadLoginAndFill = async () => {
    await loadTemplate("../../templates/html/sign_in_circle.html", "sign-in-container");
    fillLogin();
};

await loadLoginAndFill();