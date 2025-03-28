import { loadJSON, loadTemplate, initEssentials } from "./common.js";

const eventsSource = Object.entries(await loadJSON("events.json"))
    .map(([eventId, event]) => ({ id: eventId, ...event }));

const eventId = new URLSearchParams(window.location.search).get("event_id");
const commentTemplate = await loadTemplate("comment.html");

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

const createCommentElement = async (commentsSection, eventComments) => {
    if (eventComments.length === 0) {
        const noCommentsMessage = document.createElement("p");
        noCommentsMessage.textContent = "No comments yet.";
        commentsSection.appendChild(noCommentsMessage);
        return;
    }

    for (const comment of eventComments) {
        const commentElement = commentTemplate.cloneNode(true);

        const userPhotoElement = commentElement.querySelector(".user-card-photo img");
        const commentContentElement = commentElement.querySelector(".comment_content p");
        const userNameElement = commentElement.querySelector(".user-name");

        const userId = comment["user"];
        const users = await loadJSON("users.json");
        const user = users[userId];

        userPhotoElement.src = user ? user.photo : "path/to/default-photo.jpg";
        userNameElement.innerText = user ? user.name : "Unknown User";
        commentContentElement.innerText = comment.comment;

        commentsSection.appendChild(commentElement);
    }
};

const createInputCommentElement = async (inputSection, commentsSection, user) => {
    const commentInputTemplate = await loadTemplate("message_input.html");

    inputSection.appendChild(commentInputTemplate);
    const messageInput = inputSection.querySelector("#message-input");

    messageInput.addEventListener("keydown", async (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            const commentText = messageInput.value.trim();
            if (commentText) {
                const newComment = { user: user.id, comment: commentText };
                const commentElement = commentTemplate.cloneNode(true);
                const userPhotoElement = commentElement.querySelector(".user-card-photo img");
                const commentContentElement = commentElement.querySelector(".comment_content p");
                const userNameElement = commentElement.querySelector(".user-name");

                userPhotoElement.src = user.photo;
                userNameElement.innerText = user.name;
                commentContentElement.innerText = newComment.comment;

                commentsSection.appendChild(commentElement);
                messageInput.value = "";
            }
        }
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

    updateElementText(".see-less-button", staticText["reduced_event_button"]);
    updateElementText(".section-title", staticText["description"]);
    updateElementText(".participants-label", staticText["participants"]);
    updateElementText(".action-button", staticText["join_button"]["join"]);

    updateElementText(".main-title", event["name"]);
    updateElementText(".subtitle", user["username"]);
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

    updateElementHref(".participants-item", eventIdParam);

    const likeButton = eventCard.querySelector(".like-button");
    if (user["liked-events"].includes(event["id"])) {
        likeButton.classList.add("liked-event");
    }
    setupLikeButton(likeButton, likesCount, event);

    const joinButton = eventCard.querySelector(".action-button");
    if (event["members"].includes(user["id"])) {
        joinButton.classList.add("joined-event");
        joinButton.textContent = staticText["join_button"]["joined"];
    } else {
        joinButton.textContent = staticText["join_button"]["join"];
    }
    setupJoinButton(joinButton, participantsCount, event, staticText);

    const tagSection = eventCard.querySelector(".tags-section");
    await createTagElements(tagSection, event["tags"]);

    const commentSection = eventCard.querySelector(".comments_list");
    await createCommentElement(commentSection, event["comments"])
    const inputSection = eventCard.querySelector(".message-input-container");
    await createInputCommentElement(inputSection, commentSection, user);

    document.querySelector(".events-section").appendChild(eventCard);
};

const loadEvent = async () => {
    const event = eventsSource.find(event => event.id === eventId);

    const userId = localStorage.getItem("user_id") || "1";
    const users = Object.entries(await loadJSON("users.json"))
        .map(([id, user]) => ({ id, ...user }));
    const user = users.find(user => user.id === userId);

    const template = await loadTemplate("expand_card.html");
    await makeEventCard(template, event, user);

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
    await loadEvent();
};

await init();
