import { initEssentials, loadJSON, loadTemplate } from "./common.js";
import {buildUserProfileURL, getLoggedUserID} from "./utils.js";

const users = await loadJSON("users.json");
const userTemplate = await loadTemplate("user_chat.html");
const chatsConfig = await loadJSON("config.json").then(config => config["chats"]);
const messageTemplate = await loadTemplate("message.html");

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
    let name = userData["name"];
    userCard.querySelector(".user-photo").src = photo;
    let nameTag = userCard.querySelector(".user-name");
    nameTag.id = userID;
    nameTag.href = buildUserProfileURL(nameTag.href, userID);
    nameTag.textContent = name;
    return userCard;

};

const fillUserList = async (userList) => {
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

    let messages = await loadJSON("messages.json").then(messages => messages[getMessagesIDFor(getLoggedUserID(), getCurrentChatUserID())]);
    let fragment = document.createDocumentFragment();
    if (messages) messages.forEach(m => {
        let messageArticle = messageTemplate.cloneNode(true);
        if (m["author"] === getLoggedUserID()) messageArticle.querySelector("article").classList.add("self-message");
        messageArticle.querySelector(".message-body").textContent = m["body"];
        fragment.append(messageArticle);
    });
    messagesSection.appendChild(fragment);
};

const buildNewMessageWithText = (messageContent) => {
    let newMessage = messageTemplate.cloneNode(true);
    newMessage.querySelector(".message-body").textContent = messageContent;
    newMessage.querySelector("article").classList.add("self-message");
    return newMessage;
};

const setScrollToBottom = () => {
    let messagesSection = document.getElementById("messages-section");
    if (messagesSection.scrollHeight > messagesSection.clientHeight) {
        messagesSection.scrollTop = messagesSection.scrollHeight;
    }
};

const addListenerToMessageInput = (messageInput) => {
    messageInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        let messageContent = messageInput.value;
        if (messageContent === "") return;
        document.getElementById("messages-section").appendChild(buildNewMessageWithText(messageContent));
        messageInput.value = "";
        setScrollToBottom();
    });
};

const loadUserChats = async () => {
    let pageParts = getPageParts();
    await fillUserList(pageParts.userList);
    pageParts.currentChatName.textContent = getCurrentChatUser()["name"];
    await fillMessagesSectionFor(getCurrentChatUser(), pageParts.messagesSection);
    await loadTemplate("message_input.html", "message-input-container");
    document.getElementById("message-input").placeholder = chatsConfig["message-input-placeholder"];
    addListenerToMessageInput(document.getElementById("message-input"));
};

const getLoggedUser = () => {
    return users[getLoggedUserID()];
}

const init = async () => {
    await initEssentials();
    await loadUserChats();
}

await init();