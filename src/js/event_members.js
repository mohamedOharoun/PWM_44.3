import {initEssentials, loadJSON, loadTemplate} from "./common.js";
import {buildUserProfileURL} from "./utils.js";

let membersAmount = 0;
const membersListSection = document.getElementById("members-list-section");
const membersListTitle = document.getElementById("members-list-title");

const getCurrentEventID = () => {
    let urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get("event_id");
};

const getEventUsers = async () => {
    return await loadJSON("events.json").then(events => events[getCurrentEventID()]["members"]);
};

const loadUsers = async () => {
    const eventUsersIds = await getEventUsers();
    await buildUsersSection(eventUsersIds, await loadTemplate("user.html"));
    await updateMembersTitle();
};

const buildUsersSection = async (eventUsersIds, userTemplate) => {
    const fragment = document.createDocumentFragment();
    let users = await loadJSON("users.json");
    eventUsersIds.forEach(userID => {
        fragment.appendChild(buildUserTemplate(userTemplate.cloneNode(true), userID, users[userID]));
    });
    membersListSection.appendChild(fragment);
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
    await loadJSON("config.json")
        .then(data => membersListTitle.textContent = `${membersAmount} ${data["events"]["event-members"]["title"]}`);
};

const init = async () => {
    await initEssentials();
    await loadUsers();
}

await init();
