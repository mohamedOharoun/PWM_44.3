import { loadTemplate } from "./main.js";

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

    fetch("../../locales/config.json")
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

const buildListItem = (text, link) => {
    let listItem = document.createElement("li");
    let linkElement = document.createElement("a");
    linkElement.target = "_self";
    linkElement.href = link;
    linkElement.textContent = text;
    listItem.appendChild(linkElement);
    return listItem;
};

const fillHeader = () => {
    fetch("../../db/config.json")
        .then(config => config.json())
        .then(config => {
            let headerElements = config["header"];
            let navTexts = headerElements["nav"];

            let fragment = document.createDocumentFragment();
            let links = navTexts["links"];
            navTexts["titles"].forEach((text, i) => {
                fragment.appendChild(buildListItem(text, links[i]));
            });
            let navList = document.getElementById("header-navigation");
            navList.appendChild(fragment);
        });
};

const loadHeaderAndFill = async () => {
    await loadTemplate("../../templates/html/header.html", "page-header");
    fillHeader();
};

const loadLoginAndFill = async () => {
    await loadTemplate("../../templates/html/sign_in_circle.html", "sign-in-container");
    fillLogin();
};

await loadHeaderAndFill();
await loadLoginAndFill();