import {loadJSON, loadTemplate, initEssentials} from "./common.js";

const eventsSource = Object.entries(await loadJSON("events.json"))
    .map(([id, event]) => ({id, ...event}));

let events = eventsSource;
let searchTags = [];

const compactNumbers = (number) => {
    if (number <= 999) return number;
    if (number <= 999_999) return Math.floor(number / 1000) + "K";
    return Math.floor(number / 1_000_000) + "M";
};

const priceFormatting = (price) => {
    return parseFloat(price) === 0 ? "FREE" : "$" + price;
};

const createTagElements = async (tagSection, eventTags) => {
    const tagTemplate = await loadTemplate("tag.html");

    eventTags.forEach(t => {
        const tagElement = tagTemplate.cloneNode(true);
        const p = document.createElement("p");
        p.innerText = `#${t}`;
        tagElement.querySelector(".tag").appendChild(p);
        tagSection.appendChild(tagElement);
    });
};

const setupLikeButton = (likeButton, likesCount, event) => {
    likeButton.addEventListener("click", () => {
        let count = parseInt(likesCount.getAttribute("number-likes"));
        likeButton.classList.contains("liked-event") ? count-- : count++;

        likesCount.setAttribute("number-likes", count);
        likesCount.textContent = compactNumbers(count);
        likeButton.classList.toggle("liked-event");
    });
};

const setupJoinButton = (joinButton, participantsCount, event, staticText) => {
    joinButton.addEventListener("click", () => {
        let count = parseInt(participantsCount.getAttribute("number-participants"));

        if (joinButton.classList.contains("joined-event")) {
            count--;
            joinButton.textContent = staticText["join_button"]["join"];
        } else {
            count++;
            joinButton.textContent = staticText["join_button"]["joined"];
        }

        participantsCount.setAttribute("number-participants", count);
        participantsCount.textContent = compactNumbers(count);
        joinButton.classList.toggle("joined-event");
    });
};

const makeEventCard = async (eventCard, event, user) => {
    const eventIdParam = `?event_id=${event["id"]}`;
    const staticText = await loadJSON("config.json")
        .then(data => data["events"]["event-card"]);

    const updateElementText = (selector, text) => {
        eventCard.querySelector(selector).textContent = text;
    };

    const updateElementHref = (selector, href) => {
        eventCard.querySelector(selector).href += href;
    };

    updateElementText(".see-more-button", staticText["expanded_event_button"]);
    updateElementText(".section-title", staticText["description"]);
    updateElementText(".participants-label", staticText["participants"]);
    updateElementText(".action-button", staticText["join_button"]["join"]);

    updateElementText(".main-title", event["name"]);
    updateElementText(".subtitle", event["author"]);
    updateElementText(".description-text", event["description"]);
    updateElementText(".event-time", event["time"]);
    updateElementText(".event-place", event["place"]);
    updateElementText(".event-price", priceFormatting(event["price"]));

    const participantsCount = eventCard.querySelector(".participants-count");
    updateElementText(".participants-count", event["members"].length);
    participantsCount.setAttribute("number-participants", event["members"].length);

    const likesCount = eventCard.querySelector(".likes-count");
    updateElementText(".likes-count", compactNumbers(event["likes"]));
    likesCount.setAttribute("number-likes", event["likes"]);

    updateElementText(".comments-count", compactNumbers(event["comments"]));

    updateElementHref(".see-more-button", eventIdParam);
    updateElementHref(".participants-item", eventIdParam);

    const likeButton = eventCard.querySelector(".like-button");
    if (user["liked_events"].includes(event["id"])) {
        likeButton.classList.add("liked-event");
    }
    setupLikeButton(likeButton, likesCount, event);

    const joinButton = eventCard.querySelector(".action-button");
    if (event["members"].includes(user["id"]) || event["user"] === user["id"]) {
        joinButton.classList.add("joined-event");
        joinButton.textContent = staticText["join_button"]["joined"];
    }
    setupJoinButton(joinButton, participantsCount, event, staticText);

    const tagSection = eventCard.querySelector(".tags-section");
    await createTagElements(tagSection, event["tags"]);

    const article = document.createElement("article");
    article.classList.add("card");
    article.appendChild(eventCard);
    return article;
};

const getPageKey = (defaultPage) => {
    const URLParameters = new URLSearchParams(window.location.search);
    return URLParameters.get("page_key") || defaultPage;
};

const filterEventsByPage = (events, page, user) => {
    switch (page) {
        case "favourites":
            return events.filter(event => user["liked_events"].includes(event["id"]));
        case "joined":
            return events.filter(event => event["members"].includes(user["id"]));
        default:
            return events;
    }
};

const loadEvents = async () => {
    localStorage.setItem("user_id", "1");
    const userId = localStorage.getItem("user_id");
    const users = Object.entries(await loadJSON("users.json"))
        .map(([id, user]) => ({id, ...user}));
    const user = users.find(user => user.id === userId);

    const page = getPageKey("explore");
    const templateSource = page === "owned" ? "reduced_owned_card.html" : "reduced_card.html";

    events = filterEventsByPage(eventsSource, page, user);

    if (searchTags.length > 0) {
        events = events.filter(event =>
            event["tags"].some(t => searchTags.includes(t.toLowerCase()))
        );
    }

    const template = await loadTemplate(templateSource);
    const eventsList = document.getElementById("events");

    for (const event of events) {
        const eventCard = await makeEventCard(template.cloneNode(true), event, user);
        eventsList.appendChild(eventCard);
    }
};

const createSearchTagElement = async (tag) => {
    const tagTemplate = await loadTemplate("interactive_tag.html");
    const tagElement = tagTemplate.querySelector(".tag");
    const removeButton = tagElement.querySelector("button");
    const tagText = document.createElement("p");

    tagText.innerText = tag;
    tagElement.prepend(tagText);

    removeButton.addEventListener("click", () => {
        handleTagRemoval(tag, tagElement);
    });

    return tagTemplate;
};

const handleTagRemoval = async (tag, tagElement) => {
    searchTags = searchTags.filter(t => t !== tag.toLowerCase());

    document.getElementById("events").innerHTML = "";
    await loadEvents();

    tagElement.style.display = "none";
};

const setupSearchInputListener = (searchInput, searchBox, staticText) => {
    searchInput.placeholder = staticText["search-placeholder"];

    searchInput.addEventListener("keydown", async (event) => {
        if (event.key === "Enter") {
            const tag = event.target.value;
            const normalizedTag = tag.toLowerCase();

            if (!searchTags.includes(normalizedTag)) {
                searchTags.push(normalizedTag);

                const tagTemplate = await createSearchTagElement(tag);
                searchBox.appendChild(tagTemplate);

                document.getElementById("events").innerHTML = "";
                await loadEvents();

                event.target.value = "";
            }
        }
    });
};

const loadSideBar = async () => {
    const staticText = await loadJSON("config.json")
        .then(data => data["events"]["sidebar-menu"]);

    const template = await loadTemplate("events_sidebar.html");

    const menuItems = ["explore", "joined", "favourites", "owned"];
    menuItems.forEach(item => {
        template.querySelector(`#${item}`).textContent = staticText[item];
    });

    const searchInput = template.querySelector("#sidebar-search");
    const searchBox = template.querySelector(".result-box");

    setupSearchInputListener(searchInput, searchBox, staticText);

    document.getElementById("sidebar-menu").appendChild(template);
};

const init = async () => {
    await initEssentials();
    await loadSideBar();
    await loadEvents();
};

await init();
