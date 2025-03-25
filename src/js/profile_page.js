import {config, initEssentials, loadTemplate, loggedUser, loadJSON} from "./common.js";
import {buildLinkURL, getLoggedUserID} from "./utils.js";

const buildPhoto = (url) => {
    let img = document.getElementById("uploaded-img");
    img.src = url;
};

const getPageKey = () => {
    return getProfileUserID() !== null ? "user-profile" : "self-profile";
}

const getProfileParts = () => {
    let title = document.getElementById("profile-title");
    let utilsContainer = document.getElementById("profile-utils-icons");
    let photo = document.getElementById("uploaded-img");
    let fullName = document.getElementById("user-full-name");
    let username = document.getElementById("user-name");
    let userEmail = document.getElementById("user-email");
    let description = document.getElementById("description");
    let userEvents = document.getElementById("user-events");
    let sharedEvents = document.getElementById("shared-events");
    return {title, utilsContainer, photo, fullName, username, userEmail, description, userEvents, sharedEvents};
};

const fillProfileUtils = (utilsContainer) => {
    let url = config["profile"]["utils-icons"][getPageKey()][0];
    let fragment = document.createDocumentFragment();
    let img = document.createElement("img");
    img.src = url;
    let editingProfile = false;
    img.addEventListener("click", (evt) => {
        evt.preventDefault();
        editingProfile = !editingProfile;
        let nameInput = document.getElementById("user-full-name").querySelector("input");
        let usernameInput = document.getElementById("user-name").querySelector("input");
        let emailInput = document.getElementById("user-email").querySelector("input");
        let description = document.getElementById("description").querySelector("textarea");
        if (editingProfile) {
            nameInput.readOnly = false;
            usernameInput.readOnly = false;
            emailInput.readOnly = false;
            description.readOnly = false;
            img.src = "../../../assets/images/check_icon.svg";
            initializeDragAndDrop();
        } else {
            nameInput.readOnly = true;
            usernameInput.readOnly = true;
            emailInput.readOnly = true;
            description.readOnly = true;
            img.src = url;
            stopDragAndDrop();
        }});
    fragment.appendChild(img);
    utilsContainer.appendChild(fragment);
};

const getUserEvents = async (user) => {
    let events = await loadJSON("events.json");
    return Object.entries(events).filter(e => e[1]["members"].includes(user.userID));
};

const fillUserEvents = async (userEventsContainer, user) => {
    userEventsContainer = document.getElementById("user-events-content");
    let userEvents = await getUserEvents(user);
    let eventCardTemplate = loadTemplate("event_card_profile.html");
    let fragment = document.createDocumentFragment();
    for (let event in userEvents) {
        let eventData = userEvents[event][1];
        let card = (await eventCardTemplate).cloneNode(true);
        card.querySelector(".event-name").textContent = eventData["name"];
        card.querySelector(".event-description").textContent = eventData["description"];
        card.querySelector(".participants").textContent = eventData["members"].length;
        card.querySelector(".event-time-text").textContent = eventData["time"];
        card.querySelector(".event-location-text").textContent = eventData["place"];
        card.querySelector("article").addEventListener("click", (evt) => {
            let a = document.createElement("a");
            a.href = "../../pages/html/expanded_event_page.html";
            window.location.href = buildLinkURL(a.href, "event_id", event).toString();
        });
        fragment.appendChild(card);
    }
    userEventsContainer.appendChild(fragment);
};

const getSharedEvents = async (user) => {
    let events = await loadJSON("events.json");
    return Object.entries(events).filter(e => e[1]["members"].includes(user.userID) && e[1]["members"].includes(getLoggedUserID()));
};

const fillSharedEvents = async (sharedEventsContainer, user) => {
    sharedEventsContainer = document.getElementById("shared-events-content");
    let sharedEvents = await getSharedEvents(user);
    let eventCardTemplate = loadTemplate("event_card_profile.html");
    let fragment = document.createDocumentFragment();
    for (let event in sharedEvents) {
        event = sharedEvents[event][1];
        let card = (await eventCardTemplate).cloneNode(true);
        card.querySelector(".event-name").textContent = event["name"];
        card.querySelector(".event-description").textContent = event["description"];
        card.querySelector(".participants").textContent = event["members"].length;
        card.querySelector(".event-time-text").textContent = event["time"];
        card.querySelector(".event-location-text").textContent = event["place"];
        fragment.appendChild(card);
    }
    if (getPageKey() === "user-profile") sharedEventsContainer.appendChild(fragment);
};

const loadProfileStaticsTexts = (profileParts) => {
    let profileConfig = config["profile"];
    profileParts.title.textContent = profileConfig["titles"][getPageKey()];
    if (getPageKey() === "self-profile") fillProfileUtils(profileParts.utilsContainer);
    profileParts.fullName.childNodes[0].textContent = profileConfig["profile-content"]["full-name"]["label"];
    profileParts.username.childNodes[0].textContent = profileConfig["profile-content"]["name"]["label"];
    if (getPageKey() === "self-profile") profileParts.userEmail.childNodes[0].textContent = profileConfig["profile-content"]["email"]["label"];
    else document.getElementById("user-email").remove();
    profileParts.description.childNodes[0].textContent = profileConfig["profile-description"]["label"];
    profileParts.userEvents.textContent = profileConfig["events-sections-container"]["labels"][0];
    profileParts.sharedEvents.textContent = profileConfig["events-sections-container"]["labels"][1];
    if (getPageKey() === "self-profile")  document.getElementById("shared-events-section").remove();
};

const getProfileUserID = () => {
    return new URLSearchParams(window.location.search).get("user_id");
};

const fillProfileInformation = async (profileParts, user) => {
    await fillUserEvents(profileParts.userEvents, user);
    await fillSharedEvents(profileParts.userEvents, user);
    buildPhoto(user.userData["photo"]);
    profileParts.fullName.querySelector("input").placeholder = user.userData["full-name"];
    profileParts.username.querySelector("input").placeholder = user.userData["name"];
    if (getPageKey() === "self-profile") profileParts.userEmail.querySelector("input").placeholder = user.userData["e-mail"];
    profileParts.description.querySelector("textarea").textContent = user.userData["description"];
};

const getProfileUser = async () => {
    let userID = getProfileUserID() ? getProfileUserID() : getLoggedUserID();
    let users = await loadJSON("users.json");
    return {userID, userData: users[userID]};
};

const fillProfile = async () => {
    let profileParts = getProfileParts();
    loadProfileStaticsTexts(profileParts);
    await fillProfileInformation(profileParts, await getProfileUser());
};

const loadProfileAndFill = async () => {
    await loadTemplate("profile.html", "profile-container");
    await fillProfile();
};

const init = async () => {
    await initEssentials();
    await loadProfileAndFill();
}

await init();
