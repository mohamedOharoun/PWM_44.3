import {buildLinkURL} from "./utils.js";
import {getLoggedUserID} from "./utils.js";

function handleLocalObject(parameters, key) {
    let objectFromLocal = localStorage.getItem(key);
    let object = objectFromLocal ? JSON.parse(objectFromLocal) : {};
    if (!(getLoggedUserID() in Object.keys(object))) object[getLoggedUserID()] = [];
    object[getLoggedUserID()] = [...new Set(object[getLoggedUserID()]).add(parameters["userID"])];
    localStorage.setItem(key, JSON.stringify(object));
}

export const socialCardFriendUtilsFunctionalities = (parameters) => {
    switch (parameters["tag"]) {
        case "remove-user":
            handleLocalObject(parameters, "removedUsers");
            document.getElementById(`card${parameters["userID"]}`).remove();
            break;
        case "block-user":
            handleLocalObject(parameters, "blockedUsers");
            document.getElementById(`card${parameters["userID"]}`).remove();
            break;
        case "message":
            let a = document.createElement("a");
            a.href = "chat.html";
            window.location.href = buildLinkURL(a.href, "chat_id", parameters["userID"]).toString();
            break;
    }
};

export const socialCardPendingUtilsFunctionalities = (parameters) => {
    switch (parameters["tag"]) {
        case "accept":
            handleLocalObject(parameters, "friends");
            document.getElementById(`card${parameters["userID"]}`).remove();
            break;
        case "cancel":
            handleLocalObject(parameters, "canceledPending");
            document.getElementById(`card${parameters["userID"]}`).remove();
            break;
    }
};

export const socialCardSentRequestUtilsFunctionalities = (parameters) => {
    handleLocalObject(parameters, "canceledSentRequests");
    document.getElementById(`card${parameters["userID"]}`).remove();
};

export const socialCardBlockedUtilsFunctionalities = (parameters) => {
    handleLocalObject(parameters, "canceledBlockUsers");
    document.getElementById(`card${parameters["userID"]}`).remove();
};

export const socialCardGroupUtilsFunctionalities = (parameters) => {
    switch (parameters["tag"]) {
        case "cancel":
            handleLocalObject(parameters, "removedGroups");
            document.getElementById(`card${parameters["userID"]}`).remove();
            break;
        case "edit":
            let a = document.createElement("a");
            a.href = "create_group_page.html";
            window.location.href = buildLinkURL(a.href, "group_id", parameters["userID"]).toString();
            break;
    }
};