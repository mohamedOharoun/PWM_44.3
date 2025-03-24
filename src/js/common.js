export const loadTemplate = async (file, id, callback) => {
    let text = await fetch(`../../templates/html/${file}`).then(res => res.text());
    if (id !== undefined) document.getElementById(id).innerHTML = text;
    if (callback) callback();
    return document.createRange().createContextualFragment(text);
};

export let config = "";

const loadHeader = async () => {
    await fetch("../../templates/html/header.html")
        .then(res => res.text()).then(text => {
            document.getElementById("page-header").innerHTML = text;
            fillHeaderNav();
            fillHeaderUtilities();
        });
}

export const isUserLogged = () => {
    return loggedUser() !== undefined;
};

export const loggedUser = () => {
    return new URLSearchParams(window.location.search).get("logged");
}

const fillHeaderUtilities = () => {
    let logButton = document.getElementById("log-button");
    logButton.innerText = config.header[isUserLogged() ? "sign-in-button" : "log-out-button"];
    logButton.addEventListener('click', () => {
        if (loggedUser() === null) window.location.href = "./sign_in.html";
    })
};

const fillHeaderNav = () => {
    let titles = config.header.nav.titles;
    let i = 0;
    document.querySelectorAll(".page-header-link").forEach(a => {
        a.text = titles[i++];
    })
}

export const initEssentials = async () => {
    config = await loadJSON("config.json");
    await loadHeader();
    await loadTemplate("../../templates/html/footer.html", "page-footer");
}

export const loadJSON = async (file) => {
    return await fetch(`../../db/${file}`)
        .then(res => res.json());
};