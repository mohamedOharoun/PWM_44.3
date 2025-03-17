import {config, initEssentials, loadTemplate, loggedUser} from "./main.js";

const buildPhoto = (url) => {
    let img = document.getElementById("profile-image");
    img.src = url;
    return img;
};

const getPageKey = () => {
    return lastUser() !== null || lastUser() === loggedUser() ? "user-profile" : "self-profile";
}

function getProfileParts() {
    let title = document.getElementById("profile-title");
    let utilsContainer = document.getElementById("profile-utils-icons");
    let photo = document.getElementById("profile-photo");
    let fullName = document.getElementById("user-full-name");
    let username = document.getElementById("user-name");
    let userEmail = document.getElementById("user-email");
    let description = document.getElementById("description");
    let userEvents = document.getElementById("user-events");
    let sharedEvents = document.getElementById("shared-events");
    return {title, utilsContainer, photo, fullName, username, userEmail, description, userEvents, sharedEvents};
}

const fillProfileUtils = (utilsContainer) => {
    let utilsIcons = config["profile"]["utils-icons"][getPageKey()];
    let fragment = document.createDocumentFragment();
    utilsIcons.forEach(url => {
        let img = document.createElement("img");
        img.src = url;
        fragment.appendChild(img);
    });
    utilsContainer.appendChild(fragment);
};

const loadProfileStaticsTexts = (profileParts) => {
    let profileConfig = config["profile"];
    profileParts.title.textContent = profileConfig["titles"][getPageKey()];
    if (getPageKey() === "self-profile") fillProfileUtils(profileParts.utilsContainer);
    profileParts.fullName.childNodes[0].textContent = profileConfig["profile-content"]["full-name"]["label"];
    profileParts.username.childNodes[0].textContent = profileConfig["profile-content"]["username"]["label"];
    if (getPageKey() === "self-profile") profileParts.userEmail.childNodes[0].textContent = profileConfig["profile-content"]["email"]["label"];
    else document.getElementById("user-email").remove();
    profileParts.description.childNodes[0].textContent = profileConfig["profile-description"]["label"];
    profileParts.userEvents.textContent = profileConfig["events-sections-container"]["labels"][0];
    profileParts.sharedEvents.textContent = profileConfig["events-sections-container"]["labels"][1];
    if (getPageKey() === "self-profile")  document.getElementById("shared-events-section").remove();
}

const lastUser = () => {
    return new URLSearchParams(window.location.search).get("user_id");
}

const fillProfileInformation = (profileParts, user) => {
    profileParts.photo.appendChild(buildPhoto(user["photo"]));
    profileParts.fullName.querySelector("input").placeholder = user["full-name"];
    profileParts.username.querySelector("input").placeholder = user["username"];
    if (getPageKey() === "self-profile") profileParts.userEmail.querySelector("input").placeholder = user["e-mail"];
    profileParts.description.querySelector("textarea").textContent = user["description"];
}

const getUserData = async () => {
    return await fetch("../../locales/users.json").then(res => res.json()).then(users => users[lastUser() !== null ? lastUser() : "0"]);
}

const fillProfile = async () => {
    let profileParts = getProfileParts();
    loadProfileStaticsTexts(profileParts);
    fillProfileInformation(profileParts, await getUserData());
}

const loadProfileAndFill = async () => {
    await loadTemplate("../../templates/html/profile.html", "profile-container");
    await fillProfile();
}

const init = async () => {
    await initEssentials();
    await loadProfileAndFill();
}

await init();
