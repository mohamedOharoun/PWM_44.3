import { loadTemplate} from "./common.js";

await loadTemplate("../../templates/html/footer.html", "page-footer");

const fillResetPassword = () => {
    let title = document.getElementById("title");
    let textInformation = document.getElementById("text-information");
    let emailInput = document.getElementById("email-placeholder");
    let sendButton = document.getElementById("btn-send");
    let message = document.getElementById("message");
    let loginLink = document.getElementById("login-link");

    fetch("../../db/config.json")
        .then(res => res.json())
        .then(config => {
            let resetPasswordTexts = config["reset-password"];

            title.textContent = resetPasswordTexts["title"];
            textInformation.innerHTML = resetPasswordTexts["text-information"].replace(/\n/g, "<br>");
            emailInput.placeholder = resetPasswordTexts["email-placeholder"];
            sendButton.textContent = resetPasswordTexts["button-text"];

            let firstPart = resetPasswordTexts["message"]["first-part"];
            let secondPart = resetPasswordTexts["message"]["second-part"];

            message.innerHTML = `${firstPart} <a href="#" id="login-link" class="custom_link"><strong>${secondPart}</strong></a>`;
            loginLink.textContent = secondPart;
        });
};


const loadResetPasswordAndFill = async () => {
    await loadTemplate("../../templates/html/reset_password.html", "reset-password-container");
    fillResetPassword();
};

await loadResetPasswordAndFill();
