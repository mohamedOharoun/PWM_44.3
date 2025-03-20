import {config, initEssentials, loadTemplate, loadJSON} from "./common.js";
import {buildUserProfileURL} from "./utils.js";

const getPageParts = () => {
    let title = document.getElementById("title");
    let photoLabel = document.getElementById("upload-photo-text");
    let nameLabel = document.getElementById("group-name-label");
    let nameInput = document.getElementById("group-name-input");
    let memberLabel = document.getElementById("group-members-label");
    let memberInput = document.getElementById("group-members-input");
    let submitButton = document.getElementById("submit-button");
    return {title, photoLabel, nameLabel, nameInput, memberLabel, memberInput, submitButton};
};

const loadStaticsTexts = () => {
    let createGroupConfig = config["create-group"];
    let pageParts = getPageParts();
    pageParts.title.textContent = createGroupConfig["titles"];
    pageParts.photoLabel.textContent = createGroupConfig["form"]["upload-photo"]["label"];
    pageParts.nameLabel.textContent = createGroupConfig["form"]["group-name"]["label"];
    pageParts.nameInput.placeholder = createGroupConfig["form"]["group-name"]["placeholder"];
    pageParts.memberLabel.textContent = createGroupConfig["form"]["members"]["label"];
    pageParts.memberInput.placeholder = createGroupConfig["form"]["members"]["placeholder"];
    pageParts.submitButton.textContent = createGroupConfig["form"]["submit-button"];
};

const getCoincidencesOf = (users, value) => {
    return Object.entries(users).filter(e => {
       return e[1]["username"].toLowerCase().trim().startsWith(value.toLowerCase().trim());
    });
};

const addUserIfNotInSection = (userID, userTemplate, users, userData) => {
    if (!document.getElementById("members-list-section").querySelector(`#user${userID}`)) document.getElementById("members-list-section").appendChild(buildUserTemplate(userTemplate.cloneNode(true), userID, users[userID]));
}

const setMembersInput = async (input) => {
    let userTemplate = await loadTemplate("user.html");
    let users = await loadJSON("users.json");

    const suggestionsBox = document.getElementById("suggestions");

    input.addEventListener("input", () => {
        const searchText = input.value.toLowerCase();
        suggestionsBox.innerHTML = "";

        if (searchText === "") {
            suggestionsBox.style.display = "none";
            return;
        }

        const coincidences = getCoincidencesOf(users, input.value);

        if (coincidences.length > 0) {
            suggestionsBox.style.display = "block";
            coincidences.forEach(([userID, userData]) => {
                const div = document.createElement("div");
                div.textContent = userData["username"];
                div.addEventListener("click", () => {
                    addUserIfNotInSection(userID, userTemplate.cloneNode(true), users, userData);
                });
                suggestionsBox.appendChild(div);
            });
        } else {
            suggestionsBox.style.display = "none";
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
    let inputTemplate = document.getElementById("group-members-input");
    await setMembersInput(inputTemplate);
};

const init = async () => {
    await initEssentials();
    await loadInputs();
    await loadStaticsTexts();
}

await init();