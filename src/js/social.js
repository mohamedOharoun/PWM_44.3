import {initEssentials, loadJSON, loadTemplate} from "./common.js";
import {buildLinkURL, buildUserProfileURL, getLoggedUserID} from "./utils.js";
import {
    socialCardBlockedUtilsFunctionalities,
    socialCardFriendUtilsFunctionalities, socialCardGroupUtilsFunctionalities,
    socialCardPendingUtilsFunctionalities,
    socialCardSentRequestUtilsFunctionalities
} from "./social_cards_utils.js";

let socialConfig = await loadJSON("config.json").then(config => config["social"]);
const cardTemplate = await loadTemplate("social_card.html");
const users = await loadJSON("users.json");
const groups = await loadJSON("groups.json");
const loggedUser = users[getLoggedUserID()];

const getPageKey = () => {
    let URLParameters = new URLSearchParams(window.location.search);
    return URLParameters.get("page_key") === null ? "friends" : URLParameters.get("page_key");
};

const getTitleForCurrentPage = () => {
    return socialConfig["titles"][getPageKey()];
};

const normalizeString = (title) => {
    return title.toLowerCase().replace(" ", "-");
}

const addListenerToCreateButton = (button, href) => {
    button.addEventListener('click', (event) => {
        window.location.href = href;
    });
};

const buildUtilFrom = (util) => {
    let button = document.createElement("button");
    let img = document.createElement("img");
    img.loading = "lazy";
    img.src = util["icon"];
    button.appendChild(img);
    button.className = "util-button";
    addListenerToCreateButton(button, util["url"]);
    return button;
}

const loadSocialUtils = () => {
    if (getPageKey() !== "groups") return;
    document.getElementById("social-utils-container").appendChild(buildUtilFrom(socialConfig["utils"]["groups"]));
};

const loadNavigationTexts = (titles) => {
    let socialHeaderNavLinks = document.getElementById("social-header").querySelectorAll(".nav-link");
    for (let i = 0; i < socialHeaderNavLinks.length; i++) {
        socialHeaderNavLinks[i].text = titles[i];
        socialHeaderNavLinks[i].href = buildLinkURL(socialHeaderNavLinks[i].href, "page_key", normalizeString(titles[i]));
    }
}

const loadStaticsTexts = async () => {
    await loadTemplate("social_navigation.html", "social-header");
    let titles = socialConfig["nav"]["titles"];
    loadNavigationTexts(titles);
    loadSocialUtils();
}

const addListenerToCardUtilButton = (button, tag, userID) => {
    const socialCardsUtilsFunctions = {
        "friends": socialCardFriendUtilsFunctionalities,
        "pending": socialCardPendingUtilsFunctionalities,
        "sent-requests": socialCardSentRequestUtilsFunctionalities,
        "blocked": socialCardBlockedUtilsFunctionalities,
        "groups": socialCardGroupUtilsFunctionalities
    };
    button.addEventListener("click", (evt) => {
        socialCardsUtilsFunctions[getPageKey()]({button, tag, userID});
        updateInformationTitle();
    });
};

const fillCardUtils = (cardUtils, userID) => {
    let fragment = document.createDocumentFragment();
    Object.entries(socialConfig["cards-icons"][getPageKey()]).forEach(([tag, url]) => {
        let img = document.createElement("img");
        img.src = url;
        img.loading = "lazy";
        let button = document.createElement("button");
        button.appendChild(img);
        addListenerToCardUtilButton(button, tag, userID);
        fragment.appendChild(button);
    });
    cardUtils.appendChild(fragment);
};

const getSocialCardFromTemplate = () => {
    let card = cardTemplate.cloneNode(true);
    let cardPhoto = card.querySelector(".social-card-photo");
    let cardName = card.querySelector(".social-card-name");
    let cardUtils = card.querySelector(".social-card-icons-container");
    return {card, cardPhoto, cardName, cardUtils};
}

const buildCardWith = (userData, userID) => {
    let socialCard = getSocialCardFromTemplate();
    socialCard.cardPhoto.src = userData.photo;
    socialCard.cardPhoto.loading = "lazy";
    socialCard.cardName.textContent = userData.name;
    socialCard.cardName.href = getPageKey() !== "groups" ?
        buildUserProfileURL(socialCard.card.querySelector(".social-card-name").href, userID) :
        "#"
    fillCardUtils(socialCard.cardUtils, userID);
    socialCard.card.querySelector("article").id = `card${userID}`;
    return socialCard.card;
}

const updateInformationTitle = () => {
    let title = document.getElementById("social-title");
    let number = document.getElementById("social-list").children.length;
    title.textContent = `${number} ${getTitleForCurrentPage()}`;
};

const buildCards = (entities) => {
    let fragment = document.createDocumentFragment();
    Object.entries(entities).forEach(([userID, userData]) => {
        fragment.appendChild(buildCardWith(userData, userID));
    });
    return fragment;
};

const getNeededUsers = (users, loggedUser) => {
    let usersFromLocal = getUsersFromLocal();
    return Object.fromEntries(Object.entries(users).filter(
        ([userID, userData]) =>
            loggedUser[getPageKey()].includes(userID) && !usersFromLocal["remove"].includes(userID) || usersFromLocal["add"].includes(userID)
    ));
}

const getUsersFromLocal = () => {
    let localUsers = {
        "remove": [],
        "add": []
    };
    let keysListObject = entititesMap[getPageKey()];
    keysListObject["add"].forEach(k => {
        let localData = localStorage.getItem(k);
        let localDataJSON = localData ? JSON.parse(localData) : {};
        localUsers["add"] = localUsers["remove"].concat(localDataJSON[getLoggedUserID()]);
    });
    keysListObject["remove"].forEach(k => {
        let localData = localStorage.getItem(k);
        let localDataJSON = localData ? JSON.parse(localData) : null;
        if (localDataJSON) localDataJSON[getLoggedUserID()].forEach(u => {
            if (!localUsers["add"].includes(u)) localUsers["remove"].push(u)
        });
    });
    return localUsers;
}

const entititesMap = {
    "friends": {
        "remove": ["removedUsers", "blockedUsers"],
        "add": ["friends"]
    },
    "pending": {
        "remove": ["canceledPending", "friends"],
        "add": []
    },
    "sent-requests": {
        "remove": ["canceledSentRequests"],
        "add": []
    },
    "blocked": {
        "remove": ["canceledBlockUsers"],
        "add": ["blockedUsers"]
    }
}

const getGroupsFromJSON = (groups, loggedUser) => {
    return Object.entries(groups).filter(
        ([groupID, groupData]) =>
            loggedUser[getPageKey()].includes(groupID)
    );
}

const getGroupsFromLocal = () => {
    let localGroups = {
        "remove": [],
        "add": []
    }
    let createdGroups = localStorage.getItem("createdGroups");
    let removedGroups = localStorage.getItem("removedGroups");
    let removeGroupsObject = JSON.parse(removedGroups !== null ? removedGroups : "{}");
    let userRemoveGroups = removeGroupsObject[getLoggedUserID()];
    if (userRemoveGroups) localGroups["remove"] = localGroups["remove"].concat(userRemoveGroups);
    localGroups["add"] = localGroups["add"].concat(Object.entries(JSON.parse(createdGroups !== null ? createdGroups : "{}")).filter(
        ([groupID, groupData]) => {
            return groupData["members"].includes(getLoggedUserID()) && !localGroups["remove"].includes(groupID);
        }
    ));
    return localGroups;
}

const getNeededGroups = (groups, loggedUser) => {
    console.log(getGroupsFromLocal())
    return {...Object.fromEntries(getGroupsFromJSON(groups, loggedUser).filter(g => !getGroupsFromLocal()["remove"].includes(g[0]))), ...Object.fromEntries(getGroupsFromLocal()["add"])};
};

const getNeededEntities = () => {
    return getPageKey() !== "groups" ? getNeededUsers(users, loggedUser) : getNeededGroups(groups, loggedUser)
};

const loadCards = async () => {
    document.getElementById("social-list").appendChild(buildCards(getNeededEntities()));
    updateInformationTitle();
};

const init = async () => {
    await initEssentials();
    await loadStaticsTexts();
    await loadCards();
}

await init();