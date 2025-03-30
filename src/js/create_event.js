import { initEssentials, loadJSON, loadTemplate } from "./common.js"
import { buildUserProfileURL, getLoggedUserID } from "./utils.js";
import { validateEventForm, createEventObject } from "./create_event_form_validation.js";

const staticText = await loadJSON("config.json");
const userTemplate = await loadTemplate("user.html");
const users = await loadJSON("users.json");
let dropdownClick = false;
let eventTags = [];

const loadStatic = async (form) => {
    const formMode = new URLSearchParams(window.location.search).get("event_id") === null ? "create" : "edit";
    form.querySelector("#create-event-title").textContent = staticText["event-form"][formMode]["title"];
    form.querySelector("#submit_button").textContent = staticText["event-form"][formMode]["submit-button"];
    form.querySelector("#name-event").textContent = staticText["event-form"]["labels"]["name"];
    form.querySelector("#date-event").textContent = staticText["event-form"]["labels"]["date"];
    form.querySelector("#price-event").textContent = staticText["event-form"]["labels"]["cost"];
    form.querySelector("#privacy-event").textContent = staticText["event-form"]["labels"]["public"];
    form.querySelector("#members-event").textContent = staticText["event-form"]["labels"]["members"];
    form.querySelector("#event-members-input").placeholder = staticText["event-form"]["placeholders"]["members"];
    form.querySelector("#description-event").textContent = staticText["event-form"]["labels"]["description"];
    form.querySelector("#tags-event").textContent = staticText["event-form"]["labels"]["tags"];
    form.querySelector("#place-event").textContent = staticText["event-form"]["labels"]["place"];
};

const manageFormEvents = (form) => {
    document.getElementById("event-form").addEventListener("keydown", (e) => {
        if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
        }
    });

    form.querySelector("#is-private").addEventListener("change", (e) => {
        if(e.target.checked) {
            document.getElementById("privacy-event").textContent = staticText["event-form"]["labels"]["private"];
        } else {
            document.getElementById("privacy-event").textContent = staticText["event-form"]["labels"]["public"];
        }
    });
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
        else document.getElementById("event-members-input").focus();
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

const addListenerToMembersInput = async (template) => {
    const membersInputContainer = template.querySelector("#members-input-container");
    const input = template.querySelector("#event-members-input");
    const suggestionsBox = template.querySelector("#suggestions");
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
    });

    input.addEventListener("input", () => {
        if (input.value.toLowerCase() !== "") displayUsersFrom(getCoincidencesOf(users, input.value.toLowerCase()), suggestionsBox);
        else suggestionsBox.style.display = "none";
    });

    membersInputContainer.addEventListener("focusout", checkFocus);
};

const setUserData = (userArticle, userData, userID) => {
    const usernameLabel = userArticle.querySelector(".user-name");
    usernameLabel.textContent = userData["name"];
    usernameLabel.href = buildUserProfileURL(usernameLabel.href, userID);
};

const setUserPhoto = (userArticle, userData) => {
    const userPhoto = userArticle.querySelector(".user-photo");
    userPhoto.src = userData.photo;
    userPhoto.alt = `${userData.username} photo`;
    userPhoto.loading = "lazy";
};

const buildUserTemplate = (userArticle, userID, userData) => {
    userArticle.querySelector("article").id = `user${userID}`;
    const button = userArticle.querySelector(".remove-button");
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

const createTagElements = async (tag) => {
    const tagTemplate = await loadTemplate("interactive_tag.html");
    const tagElement = tagTemplate.querySelector(".tag");
    const removeButton = tagElement.querySelector("button");
    const tagText = document.createElement("p");

    tagText.innerText = `#${tag}`;
    tagElement.prepend(tagText);

    removeButton.addEventListener("click", (event) => {
        event.preventDefault();
        handleTagRemoval(tag, tagElement);
    });

    return tagTemplate;
};

const handleTagRemoval = (tag, tagElement) => {
    eventTags = eventTags.filter(t => t !== tag.toLowerCase());
    tagElement.style.display = "none";
};

const setupTagsInput = (form) => {
    const tagsInput = form.querySelector("#event-tags");
    const tagsSection = form.querySelector("#tags-section");

    tagsInput.addEventListener("keydown", async (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const tag = event.target.value;
            const normalizedTag = tag.toLowerCase();

            if (!eventTags.includes(normalizedTag)) {
                eventTags.push(normalizedTag);
                const tagTemplate = await createTagElements(tag);
                tagsSection.appendChild(tagTemplate);
                event.target.value = "";
            }
        }
    })
};

const handleFormEvents = (form) => {
    form.querySelector("#submit_button").addEventListener("click", async (event) => {
        if (!validateEventForm(document.querySelector("#event-form-container form"))) {
            return;
        }

        const eventData = await createEventObject(document.querySelector("#event-form-container form"));
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = urlParams.get('event_id');

        const storedEvents = JSON.parse(localStorage.getItem("modifiedEvents")) || {};

        if (eventId) {
            storedEvents[eventId] = {
                ...storedEvents[eventId],
                ...eventData
            };
        } else {
            const newEventId = Object.keys(storedEvents).length + 1;
            storedEvents[newEventId] = eventData;
        }

        localStorage.setItem("modifiedEvents", JSON.stringify(storedEvents));
        window.location.href = 'events.html?page_key=owned';
    });

    form.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
    });

    form.querySelector("form").addEventListener("keydown", (event) => {
        if(event.key === "Enter") {
            event.preventDefault();
        }
    });
};

const loadEventData = async (form) => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event_id');

    if (!eventId) {
        addCreatorUser();
        return;
    }

    const events = await loadJSON("events.json");
    const storedEvents = JSON.parse(localStorage.getItem("modifiedEvents")) || {};
    const event = {
        ...events[eventId],
        ...(storedEvents[eventId] || {})
    };

    document.querySelector("#event-name").value = event.name;
    document.querySelector("#event-date").value = new Date(event.time).toISOString().slice(0, 16);
    document.querySelector("#event-place").value = event.place;
    document.querySelector("#event-price").value = event.price;
    document.querySelector("#event-description").value = event.description;

    for (const tag of event.tags) {
        eventTags.push(tag.toLowerCase());
        const tagTemplate = await createTagElements(tag);
        document.querySelector("#tags-section").appendChild(tagTemplate);
    }

    for (const memberId of event.members) {
        addUser(memberId, userTemplate.cloneNode(true), users);
    }
};

const init = async () => {
    await initEssentials();
    const template = await loadTemplate("create_event_form.html");
    await loadStatic(template);
    await addListenerToMembersInput(template);
    await setupTagsInput(template);
    manageFormEvents(template);
    handleFormEvents(template);
    document.getElementById("event-form").appendChild(template);
    await loadEventData(template);
};

await init();