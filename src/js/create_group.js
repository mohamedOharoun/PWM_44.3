import {config, initEssentials, loadTemplate, loadJSON} from "./common.js";
import {buildUserProfileURL} from "./utils.js";

const getPageParts = () => {
    let title = document.getElementById("title");
    let photoLabel = document.getElementById("upload-photo-text");
    let nameLabel = document.getElementById("group-name-input").childNodes[0];
    let namePlaceholder = document.getElementById("group-name-input").childNodes[1];
    let memberLabel = document.getElementById("member-input").childNodes[0];
    let memberPlaceholder = document.getElementById("member-input").childNodes[1];
    let submitButton = document.getElementById("submit-button");
    return {title, photoLabel, nameLabel, namePlaceholder, memberLabel, memberPlaceholder, submitButton};
};

const loadStaticsTexts = () => {
    let createGroupConfig = config["create-group"];
    let pageParts = getPageParts();
    pageParts.title.textContent = createGroupConfig["titles"];
    pageParts.photoLabel.textContent = createGroupConfig["form"]["upload-photo"]["label"];
    pageParts.nameLabel.textContent = createGroupConfig["form"]["group-name"]["label"];
    pageParts.namePlaceholder.placeholder = createGroupConfig["form"]["group-name"]["placeholder"];
    pageParts.memberLabel.textContent = createGroupConfig["form"]["members"]["label"];
    pageParts.memberPlaceholder.placeholder = createGroupConfig["form"]["members"]["placeholder"];
    pageParts.submitButton.textContent = createGroupConfig["form"]["submit-button"];
};

const setNameInput = (input) => {
    input.querySelector("label").id = "group-name-input";
    document.getElementById("group-name-input-container").appendChild(input);
};

const getUser = (users, value) => {
    let user;
    Object.entries(users).forEach(([userID, userData]) => {
        if (value.trim().toLowerCase() === userData["username"].trim().toLowerCase()) user = userID;
    });
    return user;
};

const setMembersInput = async (input) => {
    input.querySelector("label").id = "member-input";
    document.getElementById("member-input-container").appendChild(input);
    let memberInput = document.getElementById("member-input-container").querySelector("input");
    let userTemplate = await loadTemplate("user.html");
    let users = await loadJSON("users.json");
    memberInput.addEventListener('keydown',  function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let user = getUser(users, memberInput.value);
            memberInput.value = "";
            if (!document.getElementById("members-list-section").querySelector("#user" + user))
            document.getElementById("members-list-section").appendChild(buildUserTemplate(userTemplate.cloneNode(true), user, users[user]));
        }
    });
};

const setUserData = (userArticle, userData, userID) => {
    let usernameLabel = userArticle.querySelector(".user-name");
    usernameLabel.textContent = userData.username;
    usernameLabel.href = buildUserProfileURL(usernameLabel.href, userID);
    usernameLabel.id = "user" + userID;
}

const setUserPhoto = (userArticle, userData) => {
    let userPhoto = userArticle.querySelector(".user-photo");
    userPhoto.src = userData.photo;
    userPhoto.alt = `${userData.username} photo`;
    userPhoto.loading = "lazy";
}

const buildUserTemplate = (userArticle, userID, userData) => {
    userArticle.id = userID;
    setUserData(userArticle, userData, userID);
    setUserPhoto(userArticle, userData);
    return userArticle;
};

const loadInputs = async () => {
    let inputTemplate = await loadTemplate("generic_input.html");
    setNameInput(inputTemplate.cloneNode(true));
    await setMembersInput(inputTemplate.cloneNode(true));
};

const init = async () => {
    await initEssentials();
    await loadInputs();
    await loadStaticsTexts();
}

await init();