import { config, initEssentials, loadTemplate } from "./common.js";

const loadFeatureCard = async (containerId, imageSrc, title, description) => {
    await loadTemplate("../../templates/html/feature_info.html", containerId);
    const container = document.getElementById(containerId);

    container.querySelector(".feature-info-img").src = imageSrc;
    container.querySelector(".feature-info-img").alt = title;
    container.querySelector(".feature-title strong").textContent = title;
    container.querySelector(".feature-info-text").textContent = description;
};

const loadStaticText = async () => {
    const { "index": indexElements } = await fetch("../../db/config.json").then(res => res.json());
    const photoContainer = document.querySelector("#main-photo-container");

    const img = document.createElement("img");
    img.src = indexElements["index-photo"];
    img.alt = "Image description";
    photoContainer.appendChild(img);

    document.querySelector(".index-title").textContent = indexElements["title"];
    document.querySelector(".introduction").textContent = indexElements["introduction"];

    let mainButton = document.getElementById("main-button");
    mainButton.textContent = indexElements["main-button"];
    mainButton.addEventListener("click", () => {
        window.location.href = "sign_up.html";
    });

    let seeMoreButton = document.getElementById("see-more-text");
    seeMoreButton.textContent = indexElements["see-more"];
    seeMoreButton.parentElement.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector('#features-info-section');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    await loadFeatureCard("add-friends", indexElements["first-card-image"], indexElements["first-card-title"], indexElements["first-card-description"]);
    await loadFeatureCard("explore-events", indexElements["second-card-image"], indexElements["second-card-title"], indexElements["second-card-description"]);
    await loadFeatureCard("split-payment", indexElements["third-card-image"], indexElements["third-card-title"], indexElements["third-card-description"]);
};

const loadSections = async () => {
    await loadStaticText();
};

const init = async () => {
    await initEssentials();
    await loadSections();
};

await init();
