import {config, initEssentials, loadTemplate, loadJSON } from "./common.js";
import {buildLinkURL, buildUserProfileURL} from "./utils.js";

let socialConfig = "";

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

const loadStaticsTexts = async () => {
    await loadTemplate("social_navigation.html", "social-header");
    let titles = socialConfig["nav"]["titles"];
    let i = 0;
    document.getElementById("social-header").querySelectorAll(".nav-link").forEach(a => {
        a.text = titles[i];
        a.href = buildLinkURL(a.href, "page_key", normalizeString(titles[i++]));
    });
    document.getElementById("social-title").textContent = getTitleForCurrentPage();
}

const fillCardUtils = (cardUtils) => {
    let fragment = document.createDocumentFragment();
    socialConfig["cards-icons"][getPageKey()].forEach(url => {
        let img = document.createElement("img");
        img.src = url;
        img.loading = "lazy";
        let button = document.createElement("button");
        button.appendChild(img);
        fragment.appendChild(button);
    });
    cardUtils.appendChild(fragment);
};

const getSocialCardFrom = (template) => {
    let card = template.cloneNode(true)
    let cardPhoto = card.querySelector(".social-card-photo");
    let cardName = card.querySelector(".social-card-name");
    let cardUtils = card.querySelector(".social-card-icons-container");
    return {card, cardPhoto, cardName, cardUtils};
}

const buildCards = (friends, template) => {
    let fragment = document.createDocumentFragment();
    Object.values(friends).forEach(([userID, userData]) => {
        let socialCard = getSocialCardFrom(template);
        socialCard.cardPhoto.src = userData.photo;
        socialCard.cardPhoto.loading = "lazy";
        socialCard.cardName.textContent = userData.username;
        socialCard.cardName.href = buildUserProfileURL(socialCard.card.querySelector(".social-card-name").href, userID)
        fillCardUtils(socialCard.cardUtils);
        fragment.appendChild(socialCard.card);
    });
    let title = document.getElementById("social-title");
    title.textContent = `${fragment.children.length} ${title.textContent}`;
    return fragment;
};

function getNeededUsers(users, loggedUser) {
    return Object.entries(users).filter(
        ([userID, userData]) =>
            loggedUser[getPageKey()].includes(userID)
    );
}

const loadCards = async () => {
    const cardTemplate = await loadTemplate("social_card.html");
    let users = await loadJSON("users.json");
    let loggedUser = users["10"];
    let friends = getNeededUsers(users, loggedUser);
    document.getElementById("social-list").appendChild(buildCards(friends, cardTemplate));
};

const init = async () => {
    await initEssentials();
    socialConfig = config["social"];
    await loadStaticsTexts();
    await loadCards();
}

await init();