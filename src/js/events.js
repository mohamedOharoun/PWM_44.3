import {loadJSON, loadTemplate, initEssentials} from "./common.js";
import {getLoggedUserID, getURLParameter, parseDateTimeLocal} from "./utils.js";

const eventsSource = Object.entries(await loadJSON("events.json"))
    .map(([id, event]) => ({id, ...event}));
const users = await loadJSON("users.json");

const eventConfig = await loadJSON("config.json")
    .then(data => data["events"]["event-card"]);
const commentTemplate = await loadTemplate("comment.html");

const getModifiedEvents = () => {
    const storedEvents = JSON.parse(localStorage.getItem("modifiedEvents")) || {};
    const deletedEvents = JSON.parse(localStorage.getItem("deletedEvents")) || [];
    return eventsSource
        .filter(event => !deletedEvents.includes(event.id))
        .map(event => ({
            ...event,
            ...(storedEvents[event.id] || {}),
        }));
};

let events = getModifiedEvents();
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

const getUserData = (userId, users) => {
    const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
    const baseUser = users.find(user => user.id === userId);
    return {
        ...baseUser,
        ...storedUserData
    };
};

const setupLikeButton = (likeButton, likesCount, event) => {
    likeButton.addEventListener("click", () => {
        let count = parseInt(likesCount.getAttribute("number-likes"));
        const userId = localStorage.getItem("user_id");
        const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};

        if (likeButton.classList.contains("liked-event")) {
            count--;
            storedUserData["liked-events"] = (storedUserData["liked-events"] || [])
                .filter(id => id !== event.id);
        } else {
            count++;
            storedUserData["liked-events"] = [
                ...(storedUserData["liked-events"] || []),
                event.id
            ];
        }

        localStorage.setItem("userData", JSON.stringify(storedUserData));

        likesCount.setAttribute("number-likes", count);
        likesCount.textContent = compactNumbers(count);
        likeButton.classList.toggle("liked-event");

        const storedEvents = JSON.parse(localStorage.getItem("modifiedEvents")) || {};
        storedEvents[event.id] = {
            ...storedEvents[event.id],
            likes: count
        };
        localStorage.setItem("modifiedEvents", JSON.stringify(storedEvents));
    });
};

const setupJoinButton = (joinButtons, participantsCounts, event, staticText) => {
    joinButtons.forEach(joinButton => {
        joinButton.addEventListener("click", () => {
            joinButtons.forEach((button, i) => {
                let count = parseInt(participantsCounts[i].getAttribute("number-participants"));

                if (button.classList.contains("joined-event")) {
                    count--;
                    button.textContent = staticText["join_button"]["join"];
                } else {
                    count++;
                    button.textContent = staticText["join_button"]["joined"];
                }

                participantsCounts[i].setAttribute("number-participants", count);
                participantsCounts[i].textContent = compactNumbers(count);
                button.classList.toggle("joined-event");
            });

            let members = [...event.members];

            if (joinButton.classList.contains("joined-event")) {
                members = members.filter(id => id !== localStorage.getItem("user_id"));
            } else {
                members.push(localStorage.getItem("user_id"));
            }

            // Store modified event data
            const storedEvents = JSON.parse(localStorage.getItem("modifiedEvents")) || {};
            storedEvents[event.id] = {
                ...storedEvents[event.id],
                members: members
            };
            localStorage.setItem("modifiedEvents", JSON.stringify(storedEvents));
        });
    });
};

const handleEventDeletion = async (event, eventCard) => {
    const deletedEvents = JSON.parse(localStorage.getItem("deletedEvents")) || [];
    deletedEvents.push(event.id);
    localStorage.setItem("deletedEvents", JSON.stringify(deletedEvents));
    eventCard.remove();
};

const makeEventCard = async (eventCard, event, user) => {
    const eventIdParam = `?event_id=${event["id"]}`;
    const staticText = await loadJSON("config.json")
        .then(data => data["events"]["event-card"]);

    const updateElementText = (selector, text) => {
        eventCard.querySelectorAll(selector).forEach(e => e.textContent = text);
    };

    const updateElementHref = (selector, href) => {
        eventCard.querySelectorAll(selector).forEach(e => e.href += href);
    };

    let eventID = getURLParameter(window.location.href, "event_id")
    updateElementText(!eventID ? ".see-more-button" : ".see-less-button", staticText[!eventID ?  "expanded_event_button" : "reduced_event_button"]);
    updateElementText(".section-title", staticText["description"]);
    updateElementText(".participants-label", staticText["participants"]);
    updateElementText(".action-button", staticText["join_button"]["join"]);

    updateElementText(".main-title", event["name"]);
    updateElementText(".subtitle", users[event["user"]]["name"]);
    updateElementText(".description-text", event["description"]);
    updateElementText(".event-time", parseDateTimeLocal(event["time"]));
    updateElementText(".event-place", event["place"]);
    updateElementText(".event-price", priceFormatting(event["price"]));

    const participantsCounts = eventCard.querySelectorAll(".participants-count");
    updateElementText(".participants-count", event["members"].length);
    participantsCounts.forEach(participantsCount => participantsCount.setAttribute("number-participants", event["members"].length));

    const likesCount = eventCard.querySelector(".likes-count");
    updateElementText(".likes-count", compactNumbers(event["likes"]));
    likesCount.setAttribute("number-likes", event["likes"]);

    if (!eventID) updateElementText(".comments-count", compactNumbers(event.comments.length));

    if (!eventID) updateElementHref(".see-more-button", eventIdParam);
    updateElementHref(".participants-item", eventIdParam);

    const likeButton = eventCard.querySelector(".like-button");
    if (user["liked-events"].includes(event["id"])) {
        likeButton.classList.add("liked-event");
    }
    setupLikeButton(likeButton, likesCount, event);

    const joinButtons = eventCard.querySelectorAll(".action-button");
    if (event["members"].includes(user["id"])) {
        joinButtons.forEach(joinButton => {
            joinButton.classList.add("joined-event");
            joinButton.textContent = staticText["join_button"]["joined"];
        });
    }
    setupJoinButton(joinButtons, participantsCounts, event, staticText);

    const tagSection = eventCard.querySelector(".tags-section");
    await createTagElements(tagSection, event["tags"]);

    if (eventID) {
        const commentSection = eventCard.querySelector(".comments_list");
        await createCommentElement(commentSection, event["comments"])
        const inputSection = eventCard.querySelector(".message-input-container");
        await createInputCommentElement(inputSection, commentSection, user);
    }

    const article = document.createElement("article");
    article.classList.add("card");
    article.appendChild(eventCard);

    if (event.user === user.id) {
        const deleteButton = article.querySelector(".delete-button");
        if (deleteButton) {
            deleteButton.addEventListener("click", () => handleEventDeletion(event, article));
        }

        const editButton = article.querySelector(".edit-button");
        if (editButton) {
            editButton.addEventListener("click", () => {
                window.location.href = `create_event_page.html?event_id=${event.id}`;
            });
        }
    }
    return article;
};

const createInputCommentElement = async (inputSection, commentsSection, user) => {
    const commentInputTemplate = await loadTemplate("message_input.html");

    inputSection.appendChild(commentInputTemplate);
    inputSection.querySelector("#message-input").placeholder = eventConfig["message-input-placeholder"];
    const messageInput = inputSection.querySelector("#message-input");

    messageInput.addEventListener("keydown", async (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            const commentText = messageInput.value.trim();
            if (commentText) {
                const newComment = {user: user.id, comment: commentText};
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

const getPageKey = (defaultPage) => {
    return getURLParameter(window.location.href, "page_key") || defaultPage;
};

const filterEventsByPage = (events, page, user) => {
    // First filter out private events that user shouldn't see
    const privacyFilteredEvents = events.filter(event =>
        !event.isPrivate ||
        event.user === user.id ||
        event.members.includes(user.id)
    );

    switch (page) {
        case "favourites":
            return privacyFilteredEvents.filter(event => user["liked-events"].includes(event["id"]));
        case "joined":
            return privacyFilteredEvents.filter(event => event["members"].includes(user["id"]));
        case "owned":
            return privacyFilteredEvents.filter(event => event["user"] === user["id"]);
        default:
            return privacyFilteredEvents;
    }
};

const loadOwnedEventActionButtons = async () => {
    return await fetch("../../templates/html/owned_event_action_buttons.html")
        .then(res => res.text());
};

const loadEvents = async () => {
    const userId = getLoggedUserID();
    const users = Object.entries(await loadJSON("users.json"))
        .map(([id, user]) => ({id, ...user}));
    const user = getUserData(userId, users);

    const page = getPageKey("explore");

    let template = await loadTemplate("reduced_card.html");
    const eventsList = document.getElementById("events");

    events = getModifiedEvents();
    events = filterEventsByPage(events, page, user);
    let eventID = getURLParameter(window.location.href, "event_id")
    if (eventID) {
        events = events.filter(e => eventID === e.id);
        template = await loadTemplate("expand_card.html");
    }

    if (searchTags.length > 0) {
        events = events.filter(event =>
            event["tags"].some(t => searchTags.includes(t.toLowerCase()))
        );
    }

    for (const event of events) {
        const eventCard = template.cloneNode(true);

        if (event.user === user.id) {
            const actionButtons = eventCard.querySelector('.action-buttons');
            actionButtons.innerHTML = await loadOwnedEventActionButtons();
        }

        const card = await makeEventCard(eventCard, event, user);
        eventsList.appendChild(card);
    }
};

const createSearchTagElement = async (tag) => {
    const tagTemplate = await loadTemplate("interactive_tag.html");
    const tagElement = tagTemplate.querySelector(".tag");
    const removeButton = tagElement.querySelector("button");
    const tagText = document.createElement("p");

    tagText.innerText = `#${tag}`;
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

const loadStaticText = async () => {
    const staticText = await loadJSON("config.json")
        .then(data => data["events"]);
    document.getElementById("events-title").textContent = staticText["title"][getPageKey("explore")];
    document.getElementById("create-event-link").textContent = staticText["create-button"];
}

const addToggleListener = () => {
    let toggleButton = document.querySelector(".toggle-menu");
    let userList = document.querySelector(".hidden-menu");
    toggleButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        userList.classList.toggle("active");
    })
};

const init = async () => {
    await initEssentials();
    await loadStaticText();
    await loadSideBar();
    await loadEvents();
    await addToggleListener();
};

await init();