import { loadTemplate } from "./main.js";

await loadTemplate("../../templates/html/footer.html", "page-footer");

const buildPhoto = (url) => {
    let img = document.getElementById("profile-image");
    img.src = url;
    return img;
};

const fillProfile = () => {
    let title = document.getElementById("profile-title")
    let photo = document.getElementById("profile-photo");
    let fullName = document.getElementById("user-full-name");
    let username = document.getElementById("user-name");
    let email = document.getElementById("user-email");
    let description = document.getElementById("description");
    let userEvents = document.getElementById("user-events");
    let sharedEvents = document.getElementById("shared-events");


    fetch("../../locales/config.json")
        .then(res => res.json())
        .then(config => {
            let profileTitles = config["profile"];
            title.textContent = profileTitles["title-self"];
            fullName.childNodes[0].textContent = profileTitles["profile-content"]["full-name-label"];
            username.childNodes[0].textContent = profileTitles["profile-content"]["username-label"];
            email.childNodes[0].textContent = profileTitles["profile-content"]["email-label"];
            description.childNodes[0].textContent = profileTitles["profile-description"]["label"];
            userEvents.textContent = profileTitles["events-section"]["labels"][0];
            sharedEvents.textContent = profileTitles["events-section"]["labels"][1];
        })

    let user = "0";

    fetch("../../locales/users.json")
        .then(res => res.json())
        .then(users => {
            let userData = users[user];
            photo.appendChild(buildPhoto(userData["photo"]));
            fullName.querySelector("input").placeholder = userData["full-name"];
            username.querySelector("input").placeholder = userData["username"];
            email.querySelector("input").placeholder = userData["e-mail"];
            description.querySelector("textarea").textContent = userData["description"];
        });
}

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
    fetch("../../locales/config.json")
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

            let logButton = document.getElementById("log-button");
            logButton.textContent = config["header"]["log-out-button"];
        });
};

const loadHeaderAndFill = async () => {
    await loadTemplate("../../templates/html/header.html", "page-header");
    fillHeader();
}

const loadProfileAndFill = async () => {
    await loadTemplate("../../templates/html/profile.html", "profile-container");
    fillProfile();
}

await loadHeaderAndFill();
await loadProfileAndFill();
