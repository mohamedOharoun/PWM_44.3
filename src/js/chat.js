import { initEssentials, loadJSON, loadTemplate } from "./common.js";
import {buildUserProfileURL} from "./utils.js";

const getPageParts = () => {
    let userList = document.getElementById("chat-users-list");
    let currentChatName = document.getElementById("current-chat-name");
    let messagesSection = document.getElementById("messages-section");
    return { userList, currentChatName, messagesSection };
};

const getUserFriends = () => {
    let friends = getLoggedUser()["friends"];
    return Object.entries(users).filter(([userID, userData]) => friends.includes(userID));
};

const buildUserCardFrom = (userTemplate, userID, userData) => {
    let userCard = userTemplate.cloneNode(true);
    let photo = userData["photo"];
    let name = userData["username"];
    userCard.querySelector(".user-photo").src = photo;
    let nameTag = userCard.querySelector(".user-name");
    nameTag.id = userID;
    nameTag.href = buildUserProfileURL(nameTag.href, userID);
    nameTag.textContent = name;
    return userCard;
};

const fillUserList = async (userList) => {
    let userTemplate = await loadTemplate("user_chat.html");
    let fragment = document.createDocumentFragment();
    getUserFriends().forEach(([userID, userData]) => {
        fragment.appendChild(buildUserCardFrom(userTemplate, userID, userData));
    });
    userList.append(fragment);
};

const getCurrentChatUser = () => {
    return getCurrentChatUserID() !== null ? users[getCurrentChatUserID()] : users["2"];
}

const getCurrentChatUserID = () => {
    let urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get("user_id") !== null ? urlParameters.get("user_id") : "2";
}

const getMessagesIDFor = (loggedUserID, currentChatUserID) => {
    return `${loggedUserID}-${currentChatUserID}`;
};

const fillMessagesSectionFor = async (currentChatUser, messagesSection) => {
    let messageTemplate = await loadTemplate("message.html");
    let messages = await loadJSON("messages.json").then(messages => messages[getMessagesIDFor(getLoggedUserID(), getCurrentChatUserID())]);
    let fragment = document.createDocumentFragment();
    messages.forEach(m => {
        let messageArticle = messageTemplate.cloneNode(true);
        if (m["author"] === getLoggedUserID()) messageArticle.querySelector("article").classList.add("self-message");
        messageArticle.querySelector(".message-body").textContent = m["body"];
        fragment.append(messageArticle);
    })
    messagesSection.appendChild(fragment);
};

const loadUserChats = async () => {
    let pageParts = getPageParts();
    await fillUserList(pageParts.userList);
    pageParts.currentChatName.textContent = getCurrentChatUser()["username"];
    fillMessagesSectionFor(getCurrentChatUser(), pageParts.messagesSection);
    await loadTemplate("message_input.html", "message-input-container");
};

let users ;

const getLoggedUser = () => {
    return users[getLoggedUserID()];
}

const getLoggedUserID = () => {
    return "1";
}

const init = async () => {
    await initEssentials();
    users = await loadJSON("users.json");
    await loadUserChats();
}

await init();