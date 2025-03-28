import {getLoggedUserID} from "./utils.js";
import {loadJSON} from "./common.js";

export const validateEventForm = (form) => {
    let isValid = true;

    // Validate required name
    const nameInput = form.querySelector("#event-name");
    if (!nameInput.value.trim()) {
        nameInput.setCustomValidity("Event name is required");
        isValid = false;
    } else {
        nameInput.setCustomValidity("");
    }

    // Validate required date
    const dateInput = form.querySelector("#event-date");
    if (!dateInput.value) {
        dateInput.setCustomValidity("Event date is required");
        isValid = false;
    } else {
        const selectedDate = new Date(dateInput.value);
        if (selectedDate < new Date()) {
            dateInput.setCustomValidity("Event date must be in the future");
            isValid = false;
        } else {
            dateInput.setCustomValidity("");
        }
    }

    // Validate required description
    const descriptionInput = form.querySelector("#event-description");
    if (!descriptionInput.value.trim()) {
        descriptionInput.setCustomValidity("Event description is required");
        isValid = false;
    } else {
        descriptionInput.setCustomValidity("");
    }

    // Validate members
    const membersSection = form.querySelector("#members-list-section");
    const membersInput = form.querySelector("#event-members-input");
    if (membersSection.innerHTML === "") {
        membersInput.setCustomValidity("At least one member should be added.");
        isValid = false;
    } else {
        membersInput.setCustomValidity("");
    }

    // Validate price
    const priceInput = form.querySelector("#event-price");
    if (priceInput.value < 0) {
        priceInput.setCustomValidity("Price cannot be negative");
        isValid = false;
    } else {
        priceInput.setCustomValidity("");
    }

    const tags = form.querySelector(".tag p");
    if (priceInput.value < 0) {
        priceInput.setCustomValidity("Price cannot be negative");
        isValid = false;
    } else {
        priceInput.setCustomValidity("");
    }

    // Validate required place
    const placeInput = form.querySelector("#event-place");
    if (!placeInput.value.trim()) {
        placeInput.setCustomValidity("Event location is required");
        isValid = false;
    } else {
        placeInput.setCustomValidity("");
    }

    return isValid;
};

export const createEventObject = async (form) => {
    const members = Array.from(form.querySelectorAll("#members-list-section article"))
        .map(user => user.id.replace("user", ""));

    const eventTags = Array.from(form.querySelectorAll(".tag p"))
        .map(tag => tag.textContent)
        .map(tag => tag.replace("#", ""))
        .map(tag => tag.trim());

    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event_id');

    // If editing, get existing likes and comments
    let likes = 0;
    let comments = [];

    if (eventId) {
        const modifiedEvents = JSON.parse(localStorage.getItem("modifiedEvents")) || {};
        const fileEvents = await loadJSON("events.json");

        const fileEvent = fileEvents[eventId] || {};

        const modifiedEvent = modifiedEvents[eventId] || {};

        const existingEvent = {
            ...fileEvent,   // Base event data
            ...modifiedEvent,  // Override with modified properties
            likes: modifiedEvent.likes ?? fileEvent.likes ?? 0,
            comments: modifiedEvent.comments ?? fileEvent.comments ?? [],
        };
        if (existingEvent) {
            likes = existingEvent.likes || 0;
            comments = existingEvent.comments || [];
        }
    }

    return {
        user: getLoggedUserID(),
        name: form.querySelector("#event-name").value,
        time: form.querySelector("#event-date").value,
        place: form.querySelector("#event-place").value,
        price: parseFloat(form.querySelector("#event-price").value),
        isPrivate: form.querySelector("#is-private").checked,
        description: form.querySelector("#event-description").value,
        members: members,
        tags: eventTags,
        likes: likes,
        comments: comments
    };
};
