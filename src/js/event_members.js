import {config, initEssentials, loadTemplate, loadJSON} from "./common.js";
import {buildUserProfileURL} from "./utils.js";

let membersAmount = 0;
const membersListSection = document.getElementById("members-list-section");
const membersListTitle = document.getElementById("members-list-title");
const userTemplate = await loadTemplate("user.html");
const events = await loadJSON("events.json");

const getCurrentEventID = () => {
    let urlParameters = new URLSearchParams(window.location.search);
    let eventID = urlParameters.get("event_id");
    return eventID !== null ? eventID : "1";
};

const getEventUsersFrom = (users) => {
    let eventID = getCurrentEventID();
    let membersIDs = events[eventID]["members"];
    return Object.entries(users).filter(u => membersIDs.includes(u[0]));
};

const loadUsers = async () => {
    const eventUsers = getEventUsersFrom(await loadJSON("users.json"));
    await buildUsersSection(eventUsers, userTemplate);
    await updateMembersTitle();
};

const buildUsersSection = async (users, userTemplate) => {
    const fragment = document.createDocumentFragment();
    users.forEach(([userID, userData]) => {
        fragment.appendChild(buildUserTemplate(userTemplate.cloneNode(true), userID, userData));
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
    fetch("../../db/config.json")
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
