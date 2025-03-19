import { loadJSON, loadTemplate } from "./common.js";

const compactNumbers = (number) => {
    if (number <= 999) return number;
    if (number <= 999_999) return Math.floor(number / 1000) + "K";
    return Math.floor(number / 1_000_000) + "M";
};

const priceFormatting = (price) => {
    return price == 0 ? "FREE" : "$" + price;
};

const makeEventCard = async (event_card, event, event_id) => {
    //const event_struct = stringToHTML(event_structure);
    const event_id_param = `?event_id=${event_id}`;
    const static_text = await loadJSON("config.json")
        .then(data => data["events"]);

    const article = document.createElement("article");
    article.classList.add("card");
    event_card.querySelector(".see-more-button").textContent = static_text["expanded_event_button"];
    event_card.querySelector(".section-title").textContent = static_text["description"];
    event_card.querySelector(".participants-label").textContent = static_text["participants"];
    event_card.querySelector(".action-button").textContent = static_text["join_button"];

    event_card.querySelector(".main-title").textContent = event.name;
    event_card.querySelector(".subtitle").textContent = event.author;
    event_card.querySelector(".description-text").textContent = event.description;
    event_card.querySelector(".event-time").textContent = event.time;
    event_card.querySelector(".event-place").textContent = event.place;
    event_card.querySelector(".event-price").textContent = priceFormatting(event.price);
    event_card.querySelector(".participants-count").textContent = event.members.length;
    event_card.querySelector(".likes-count").textContent = compactNumbers(event.likes);
    event_card.querySelector(".likes-count").setAttribute("number-likes", event.likes);
    event_card.querySelector(".comments-count").textContent = compactNumbers(event.comments);
    event_card.querySelector(".see-more-button").href += event_id_param;
    event_card.querySelector(".participants-item").href += event_id_param;

    const likesCount = event_card.querySelector(".likes-count");
    const likeButton = event_card.querySelector(".like-button");

    likeButton.addEventListener("click", (event) => {
        let count = parseInt(likesCount.getAttribute("number-likes"));
        likeButton.classList.contains("liked-event") ? count-- : count++;
        likesCount.setAttribute("number-likes", count);
        likesCount.textContent = compactNumbers(count);
        likeButton.classList.toggle("liked-event");
    });


    article.appendChild(event_card);
    return article;
};

const loadEventStructure = async () => {
    return await fetch("../../templates/html/reduced_card.html")
        .then(res => res.text());
};

const init = async () => {
    const template = await loadTemplate("reduced_card.html");
    const events = await loadJSON("events.json");
    const eventsList = document.getElementById("events");
    for (const event in events) {
        const eventCard = await makeEventCard(template.cloneNode(true), events[event], event);
        eventsList.appendChild(eventCard);
    }
};

init();
