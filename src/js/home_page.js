import {config, initEssentials, loadTemplate} from "./common.js";


const getRandomItems = (arr, num) => arr.length <= num ? arr : arr.sort(() => Math.random() - 0.5).slice(0, num);

const updateSectionTitle = (sectionId, title) => {
    const section = document.getElementById(sectionId);
    if (section) {
        const titleElement = section.querySelector("h1") || document.createElement("h1");
        titleElement.textContent = title;
        section.prepend(titleElement);
    }
};

const loadStaticText = async () => {
    const { "home-page": homePageTexts } = await fetch("../../db/config.json").then(res => res.json());
    const photoContainer = document.querySelector(".photo-container");

    const img = document.createElement("img");
    img.src = homePageTexts["photo"];
    img.alt = "Descripción de la imagen";
    photoContainer.appendChild(img);

    document.querySelector(".home-title").textContent = homePageTexts["title"];
    document.querySelector(".text").textContent = homePageTexts["text-info"];
    document.getElementById("button-one").textContent = homePageTexts["button-one"];
    document.getElementById("button-two").textContent = homePageTexts["button-two"];

    ["friends-container", "events-container", "payments-container"].forEach(id =>
        updateSectionTitle(id, homePageTexts[id])
    );
};

const loadItems = async (url, containerId, itemName, additionalContent = "") => {
    const data = await fetch(url).then(res => res.json());
    const randomNum = Math.floor(Math.random() * 5) + 1;
    let randomItems = getRandomItems(Object.values(data), randomNum);

    if (containerId === "payments-container") {
        randomItems = randomItems.filter(item => item.price > 0);
    }

    const container = document.getElementById(containerId);
    let cards = container.querySelectorAll(".card");

    while (cards.length > randomItems.length) {
        container.removeChild(cards[cards.length - 1]);
        cards = container.querySelectorAll(".card");
    }

    for (let i = cards.length; i < randomItems.length; i++) {
        container.appendChild(document.createElement("div")).classList.add("card");
    }

    cards = container.querySelectorAll(".card");

    randomItems.forEach((item, index) => {
        let content = `<p>${item[itemName]}</p>`;

        if (additionalContent) {
            content += additionalContent.replace("{{price}}", item.price || "0")
                .replace("{{date}}", item.time || "Fecha no disponible");
        }

        cards[index].innerHTML = content;
    });
};

const loadSections = async () => {
    await Promise.all([
        loadTemplate("../../templates/html/home_card.html", "friends-container"),
        loadTemplate("../../templates/html/home_card.html", "events-container"),
        loadTemplate("../../templates/html/home_card.html", "payments-container")
    ]);

    await loadStaticText();

    await Promise.all([
        loadItems("../../db/users.json", "friends-container", "full-name"),
        loadItems("../../db/events.json", "events-container", "name", `<p>{{date}}</p>`),
        loadItems("../../db/events.json", "payments-container", "name", `<p>{{price}}€</p>`)
    ]);
};

const init = async () => {
    await initEssentials();
    await loadSections();
}

await init();

