import { initEssentials, loadJSON, loadTemplate } from "./common.js"
import { buildUserProfileURL, getLoggedUserID } from "./utils.js";
import { validateEventForm, createEventObject } from "./create_event_form_validation.js";

const staticText = await loadJSON("config.json");
const userTemplate = await loadTemplate("user.html");
const users = await loadJSON("users.json");
let dropdownClick = false;
let eventTags = [];

const loadStatic = async (form) => {
    form.querySelector("#create-event-title").textContent = staticText["create-event"]["title"];
    form.querySelector("#submit_button").textContent = staticText["create-event"]["submit-button"];
    form.querySelector("#name-event").textContent = staticText["create-event"]["labels"]["name"];
    form.querySelector("#date-event").textContent = staticText["create-event"]["labels"]["date"];
    form.querySelector("#price-event").textContent = staticText["create-event"]["labels"]["cost"];
    form.querySelector("#privacy-event").textContent = staticText["create-event"]["labels"]["public"];
    form.querySelector("#members-event").textContent = staticText["create-event"]["labels"]["members"];
    form.querySelector("#event-members-input").placeholder = staticText["create-event"]["placeholders"]["members"];
    form.querySelector("#description-event").textContent = staticText["create-event"]["labels"]["description"];
    form.querySelector("#tags-event").textContent = staticText["create-event"]["labels"]["tags"];
};

const manageFormEvents = (form) => {
    // Remove the keydown prevention or modify it to only prevent form submission
    document.getElementById("event-form").addEventListener("keydown", (e) => {
        // Only prevent form submission via Enter key
        if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
        }
    });

    form.querySelector("#is-private").addEventListener("change", (e) => {
        if(e.target.checked) {
            document.getElementById("privacy-event").textContent = staticText["create-event"]["labels"]["private"];
        } else {
            document.getElementById("privacy-event").textContent = staticText["create-event"]["labels"]["public"];
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
    form.querySelector("#submit_button").addEventListener("click", (event) => {
        if (!validateEventForm(document.querySelector("#event-form-container form"))) {
            return;
        }

        const eventData = createEventObject(document.querySelector("#event-form-container form"));

        // Store in localStorage similar to groups
        console.log("eventData", eventData);
        const createdEvents = JSON.parse(localStorage.getItem("createdEvents")) || {};
        const eventId = Object.keys(createdEvents).length + 1;
        createdEvents[eventId] = eventData;
        localStorage.setItem("eventsFromUse", JSON.stringify(createdEvents));
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

const init = async () => {
    await initEssentials();
    const template = await loadTemplate("create_event_form.html");
    await loadStatic(template);
    await addListenerToMembersInput(template);
    await setupTagsInput(template);
    manageFormEvents(template);
    handleFormEvents(template);
    document.getElementById("event-form").appendChild(template);
};

await init();