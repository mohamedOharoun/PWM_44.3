const stringToHTML = (string) => {
    return new DOMParser().parseFromString(string, "text/html");
};

const compactNumbers = (number) => {
    if (number < 999) return number;
    if (number < 999_900) return (number / 1000).toFixed(0) + "K";
    if (number < 999_999_999) return (number / 1_000_000).toFixed(0) + "M";
};

const priceFormatting = (price) => {
    return price == 0 ? "FREE" : "$" + price;
};

const makeEventCard = async (event_structure, event) => {
    const event_struct = stringToHTML(event_structure);
    const event_id_param = `?event_id=${event.id}`;
    const static = JSON.parse(`{
      "expanded_event_button": "SEE MORE",
      "description": "Description",
      "participants": "participants",
      "join_button": "JOIN"
    }`);
    console.log(static);
    const article = document.createElement("article");
    article.classList.add("card");

    event_struct.getElementsByClassName("see-more-button")[0].textContent = static.expanded_event_button;
    event_struct.getElementsByClassName("section-title")[0].textContent = static.description;
    event_struct.getElementsByClassName("participants-label")[0].textContent = static.participants;
    event_struct.getElementsByClassName("action-button")[0].textContent = static.join_button;

    event_struct.getElementsByClassName("main-title")[0].textContent = event.name;
    event_struct.getElementsByClassName("subtitle")[0].textContent = event.author;
    event_struct.getElementsByClassName("description-text")[0].textContent = event.description;
    event_struct.getElementsByClassName("event-time")[0].textContent = event.time;
    event_struct.getElementsByClassName("event-place")[0].textContent = event.place;
    event_struct.getElementsByClassName("event-price")[0].textContent = priceFormatting(event.price);
    event_struct.getElementsByClassName("participants-count")[0].textContent = event.members.length;
    event_struct.getElementsByClassName("likes-count")[0].textContent = compactNumbers(event.likes);
    event_struct.getElementsByClassName("comments-count")[0].textContent = compactNumbers(event.comments);
    event_struct.getElementsByClassName("see-more-button")[0].href += event_id_param;
    event_struct.getElementsByClassName("participants-item")[0].href += event_id_param;
    const likeButton = event_struct.getElementsByClassName("like-button")[0];
    likeButton.addEventListener("click", (event) => {
        likeButton.classList.toggle("liked-event");
    });

    Array.from(event_struct.body.children).forEach(child => {
        article.appendChild(child);
    });
    return article;
};

const loadEventStructure = async () => {
    return await fetch("../../templates/html/reduced_card.html")
        .then(res => res.text());
};

const loadJSON = async (file) => {
    return await fetch(`../../locales/${file}`)
        .then(res => res.json());
};

const init = async () => {
    const event_structure = await loadEventStructure();
    const events = await loadJSON("events.json");
    const eventsList = document.getElementById("events");
    for (const event of events) {
        const eventCard = await makeEventCard(event_structure, event);
        eventsList.appendChild(eventCard);
    }
};

init();
