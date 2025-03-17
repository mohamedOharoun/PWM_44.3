import {initEssentials, loadTemplate} from "./main.js";

let membersAmount = 0;
const membersListSection = document.getElementById("members-list-section");
const membersListTitle = document.getElementById("members-list-title");
const userTemplate = await loadTemplate("../../templates/html/user.html");

const loadUsers = async () => {
    const users = await (await fetch("../../locales/users.json")).json();
    await buildUsersSection(users, userTemplate);
    await updateMembersTitle();
};

const buildUsersSection = async (users, userTemplate) => {
    const fragment = document.createDocumentFragment();
    Object.entries(users).forEach(([userID, userData]) => {
        fragment.appendChild(buildUserTemplate(userTemplate.cloneNode(true), userID, userData));
    });
    membersListSection.appendChild(fragment);
}

const buildUserProfileURL = (href, userID) => {
    let userProfileURL = new URL(href);
    let userProfileURLParameters = new URLSearchParams(userProfileURL.search);
    console.log(userProfileURLParameters.toString());
    userProfileURLParameters.set("user_id", userID);
    userProfileURL.search = userProfileURLParameters.toString();
    return userProfileURL;
}

const setUserData = (userArticle, userData, userID) => {
    let usernameLabel = userArticle.querySelector(".user-name");
    usernameLabel.textContent = userData.username;
    usernameLabel.href = buildUserProfileURL(usernameLabel.href, userID);
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
    membersAmount++;
    return userArticle;
};

const updateMembersTitle = async () => {
    fetch("../../locales/config.json")
        .then(res => res.json())
        .then(data => {
            membersListTitle.textContent = `${membersAmount} ${data.events["event-members"].title}`;
        })
        .catch(err => console.error("Could not load configuration:", err));
};

const init = async () => {
    await initEssentials();
    await loadUsers();
}

await init();
