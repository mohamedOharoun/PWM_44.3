export const loadTemplate = async (file, id, callback) => {
    let text = await fetch(`../../templates/html/${file}`).then(res => res.text());
    if (id !== undefined) document.getElementById(id).innerHTML = text;
    if (callback) callback();
    return document.createRange().createContextualFragment(text);
};

export const initEssentials = async () => {
    await loadHeader();
    await loadTemplate("footer.html", "page-footer");

}
export const loadJSON = async (file) => {
    return await fetch(`../../db/${file}`)
        .then(res => res.json());

};

export const config = await loadJSON("config.json");

export const isUserLogged = () => {
    return loggedUser() !== undefined;

};
export const loggedUser = () => {
    return new URLSearchParams(window.location.search).get("logged");
}

const loadHeader = async () => {
    await loadTemplate("header.html", "page-header");
    fillHeaderNav();
    fillHeaderUtilities();
}

const fillHeaderUtilities = () => {
    let logButton = document.getElementById("log-button");
    logButton.innerText = config["header"][isUserLogged() ? "sign-in-button" : "log-out-button"];
    logButton.addEventListener('click', () => {
        if (loggedUser() === null) window.location.href = "./sign_in.html";
    });
};

const fillHeaderNav = () => {
    let titles = config["header"]["nav"]["titles"];
    let headerNavigationChildren = document.getElementById("header-navigation").children;
    let headerNavigationDropdownChildren = document.getElementById("header-navigation-dropdown").children;
    for (let i = 0; i < headerNavigationChildren.length; i++) {
        headerNavigationChildren[i].querySelector("a").textContent = titles[i];
        headerNavigationDropdownChildren[i].querySelector("a").textContent = titles[i];
        headerNavigationDropdownChildren[i].addEventListener("click", () => {
            window.location.href = headerNavigationDropdownChildren[i].querySelector("a").href;
        });
    }
    let dropdownButton = document.getElementById("toggle-dropdown-menu");
    let displayMenu = false;
    let dropdownMenu = document.getElementById("header-dropdown-navigation");
    dropdownButton.addEventListener("click", () => {
        displayMenu = !displayMenu;
        if (displayMenu) dropdownMenu.style.display = "flex";
        else dropdownMenu.style.display = "none";
    });
}

export const getPageKey = (base) => {
    let URLParameters = new URLSearchParams(window.location.search);
    return URLParameters.get("page_key") === null ? base : URLParameters.get("page_key");
};