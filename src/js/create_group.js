import {config, initEssentials, loadTemplate, loadJSON, getUsers} from "./common.js";
import {buildUserProfileURL, getLoggedUserID, getURLParameter} from "./utils.js";
import {addListenerToSubmitButton} from "./create_group_form_validation.js";

const userTemplate = await loadTemplate("user.html");
const users = await getUsers();
let dropdownClick = false;

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
    pageParts.submitButton.textContent = createGroupConfig["form"]["submit-button"][getURLParameter(window.location.href, "group_id") ? 1 : 0];
    addListenerToSubmitButton(pageParts.submitButton);
};

const getCoincidencesOf = (users, value) => {
    return Object.entries(users).filter(e => {
        return e[1]["name"].toLowerCase().trim().startsWith(value.toLowerCase().trim());
    }).filter(e => {
        return !document.getElementById("members-list-section").querySelector(`#user${e[0]}`);
    });
};

const addUser = (userID, userTemplate, users) => {
    document.getElementById("members-list-section").appendChild(buildUserTemplate(userTemplate.cloneNode(true), userID, users[userID]));
}

function createSearchUserCard(suggestionBox, userData, userID, userTemplate, users) {
    const div = document.createElement("div");
    div.id = `dropdownUser${userID}`
    div.textContent = userData["name"];
    div.addEventListener("mousedown", () => {
        addUser(userID, userTemplate.cloneNode(true), users);
        document.getElementById(`dropdownUser${userID}`).remove();
        if (!suggestionBox.children.length) suggestionBox.style.display = "none";
        else document.getElementById("group-members-input").focus();
        dropdownClick = true;
    });
    return div;
}

const displayUsersFrom = (coincidences, suggestionsBox) => {
    if (coincidences.length) {
        suggestionsBox.style.display = "block";
        suggestionsBox.innerHTML = "";
        coincidences.forEach(([userID, userData]) => {
            suggestionsBox.appendChild(createSearchUserCard(suggestionsBox, userData, userID, userTemplate, users));
        });
    } else {
        suggestionsBox.style.display = "none";
    }
}

const addListenerToMembersInput = async () => {
    let membersInputContainer = document.getElementById("members-input-container");
    let input = document.getElementById("group-members-input");
    const suggestionsBox = document.getElementById("suggestions");
    const checkFocus = () => {
        setTimeout(() => {
            if (!dropdownClick && !membersInputContainer.contains(document.activeElement)) {
                suggestionsBox.style.display = "none";
            }
            dropdownClick = false;
        }, 0);
    };

    input.addEventListener("keydown", (event) => {
        if (event.key === "Escape") input.blur();
    });

    input.addEventListener("focus", () => {
        if (input.value.toLowerCase() !== "") displayUsersFrom(getCoincidencesOf(users, input.value.toLowerCase()), suggestionsBox);
        else suggestionsBox.style.display = "none";
    })

    input.addEventListener("input", () => {
        if (input.value.toLowerCase() !== "") displayUsersFrom(getCoincidencesOf(users, input.value.toLowerCase()), suggestionsBox);
        else suggestionsBox.style.display = "none";
    });

    membersInputContainer.addEventListener("focusout", checkFocus);
};

const setUserData = (userArticle, userData, userID) => {
    let usernameLabel = userArticle.querySelector(".user-name");
    usernameLabel.textContent = userData["name"];
    usernameLabel.href = buildUserProfileURL(usernameLabel.href, userID);
};

const setUserPhoto = (userArticle, userData) => {
    let userPhoto = userArticle.querySelector(".user-photo");
    userPhoto.src = userData.photo;
    userPhoto.alt = `${userData.username} photo`;
    userPhoto.loading = "lazy";
};

const buildUserTemplate = (userArticle, userID, userData) => {
    userArticle.querySelector("article").id = `user${userID}`;
    let button = userArticle.querySelector(".remove-button");
    button.addEventListener("click", (evt) => {
        evt.preventDefault();
        document.getElementById(`user${userID}`).remove();
    });
    setUserData(userArticle, userData, userID);
    setUserPhoto(userArticle, userData);
    return userArticle;
};

const addCreatorUser = () => {
    addUser(getLoggedUserID(), userTemplate.cloneNode(true), users)
    document.getElementById(`user${getLoggedUserID()}`).querySelector("button").remove()
};

const getGroup = async () => {
    let group = await loadJSON("groups.json").then(groups => groups[getURLParameter(window.location.href, "group_id")]);
    let createdGroups = localStorage.getItem("createdGroups");
    if (createdGroups) group = {...group, ...JSON.parse(createdGroups)[getURLParameter(window.location.href, "group_id")]};
    return group;
}

const fillPage = async () => {
    let group = await getGroup();
    document.getElementById("group-name-input").value = group["name"];
    document.getElementById("uploaded-img").src = group["photo"];
    group["members"].forEach(id => {
        if (id !== getLoggedUserID()) addUser(id, userTemplate.cloneNode(true), users);
    });
};

const init = async () => {
    await initEssentials();
    await addListenerToMembersInput();
    await loadStaticsTexts();
    await addCreatorUser();
    initializeDragAndDrop();
    if (getURLParameter(window.location.href, "group_id")) await fillPage();
};

await init();