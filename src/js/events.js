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
    return price == 0 ? "FREE" : "$" + price;
};

const makeEventCard = async (eventCard, event, user) => {
    const eventIdParam = `?event_id=${event.id}`;
    const staticText = await loadJSON("config.json")
        .then(data => data["events"]["event-card"]);

    eventCard.querySelector(".see-more-button").textContent = staticText["expanded_event_button"];
    eventCard.querySelector(".section-title").textContent = staticText["description"];
    eventCard.querySelector(".participants-label").textContent = staticText["participants"];
    eventCard.querySelector(".action-button").textContent = staticText["join_button"]["join"];

    eventCard.querySelector(".main-title").textContent = event.name;
    eventCard.querySelector(".subtitle").textContent = event.author;
    eventCard.querySelector(".description-text").textContent = event.description;
    eventCard.querySelector(".event-time").textContent = event.time;
    eventCard.querySelector(".event-place").textContent = event.place;
    eventCard.querySelector(".event-price").textContent = priceFormatting(event.price);
    eventCard.querySelector(".participants-count").textContent = event.members.length;
    eventCard.querySelector(".participants-count").setAttribute("number-participants", event.members.length);
    eventCard.querySelector(".likes-count").textContent = compactNumbers(event.likes);
    eventCard.querySelector(".likes-count").setAttribute("number-likes", event.likes);
    eventCard.querySelector(".comments-count").textContent = compactNumbers(event.comments);
    eventCard.querySelector(".see-more-button").href += eventIdParam;
    eventCard.querySelector(".participants-item").href += eventIdParam;

    const likesCount = eventCard.querySelector(".likes-count");
    const likeButton = eventCard.querySelector(".like-button");

    if (user["liked_events"].includes(event.id))
        likeButton.classList.add("liked-event");

    likeButton.addEventListener("click", (event) => {
        let count = parseInt(likesCount.getAttribute("number-likes"));
        likeButton.classList.contains("liked-event") ? count-- : count++;
        likesCount.setAttribute("number-likes", count);
        likesCount.textContent = compactNumbers(count);
        likeButton.classList.toggle("liked-event");
    });

    const joinButton = eventCard.querySelector(".action-button");
    const participantsCount = eventCard.querySelector(".participants-count");

    if (event["members"].includes(user["id"]) || event["user"] === user["id"]) {
        joinButton.classList.add("joined-event");
        joinButton.textContent = staticText["join_button"]["joined"];
    }

    joinButton.addEventListener("click", (event) => {
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

    let tagTemplate = await loadTemplate("tag.html");
    const tagSection = eventCard.querySelector(".tags-section");

    event["tags"].forEach(t => {
        const tagElement = tagTemplate.cloneNode(true);
        const p = document.createElement("p");
        p.innerText = `#${t}`;
        tagElement.querySelector(".tag").appendChild(p);
        tagSection.appendChild(tagElement);
    });

    const article = document.createElement("article");
    article.classList.add("card");
    article.appendChild(eventCard);
    return article;
};

const getPageKey = (defaultPage) => {
    let URLParameters = new URLSearchParams(window.location.search);
    return URLParameters.get("page_key") === null ? defaultPage : URLParameters.get("page_key");
};

const loadEventStructure = async () => {
    return await fetch("../../templates/html/reduced_card.html")
        .then(res => res.text());
};

const loadEvents = async () => {
    localStorage.setItem("user_id", "1");
    const userId = localStorage.getItem("user_id");
    const user = Object.entries(await loadJSON("users.json"))
        .map(([id, user]) => ({id, ...user}))
        .filter(user => user.id === userId)[0];

    let templateSource = "reduced_card.html";
    const page = getPageKey("explore");

    if (page === "favourites") {
        events = events.filter(event => user["liked_events"].includes(event.id));
    } else if (page === "joined") {
        events = events.filter(event => event["members"].includes(user.id));
    } else if (page === "owned") {
        templateSource = "reduced_owned_card.html";
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

const handleTagRemoval = (tag, tagElement) => {
    searchTags = searchTags.filter(t => t !== tag.toLowerCase());

    events = searchTags.length === 0
        ? eventsSource
        : eventsSource.filter(event =>
            event["tags"].some(t => searchTags.includes(t))
        );

    document.getElementById("events").innerHTML = "";
    loadEvents();

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

                events = eventsSource.filter(event =>
                    event["tags"].some(t => searchTags.includes(t))
                );

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

init();
