import { initEssentials, loadJSON, loadTemplate } from "./common.js"

const staticText = await loadJSON("config.json");

const loadStatic = async (form) => {
    form.querySelector("#create-event-title").textContent = staticText["create-event"]["title"];
    form.querySelector("#submit_button").textContent = staticText["create-event"]["submit-button"];
    form.querySelector("#name-event").textContent = staticText["create-event"]["labels"]["name"];
    form.querySelector("#date-event").textContent = staticText["create-event"]["labels"]["date"];
    form.querySelector("#price-event").textContent = staticText["create-event"]["labels"]["cost"];
    form.querySelector("#privacy-event").textContent = staticText["create-event"]["labels"]["public"];
    form.querySelector("#members-event").textContent = staticText["create-event"]["labels"]["members"];
    form.querySelector("#members-select").placeholder = staticText["create-event"]["placeholders"]["members"];
    form.querySelector("#description-event").textContent = staticText["create-event"]["labels"]["description"];
    form.querySelector("#tags-event").textContent = staticText["create-event"]["labels"]["tags"];
};

const manageFormEvents = (form) => {
    document.getElementById("event-form").addEventListener("submit", (e) => {
       e.preventDefault();
    });

    document.getElementById("event-form").addEventListener("keydown", (e) => {
        e.preventDefault();
    });

    form.querySelector("#is-private").addEventListener("change", (e) => {
        if(e.target.checked) {
            document.getElementById("privacy-event").textContent = staticText["create-event"]["labels"]["private"];
        } else {
            document.getElementById("privacy-event").textContent = staticText["create-event"]["labels"]["public"];
        }
    })
};

const init = async () => {
    await initEssentials();
    const template = await loadTemplate("create_event_form.html");
    await loadStatic(template);
    manageFormEvents(template);
    document.getElementById("event-form").appendChild(template);
};

await init();