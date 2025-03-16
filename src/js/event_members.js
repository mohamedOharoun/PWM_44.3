import { loadTemplate } from "./main.js";

loadTemplate("../../templates/html/header.html", "page-header");
loadTemplate("../../templates/html/footer.html", "page-footer");

let membersAmount = 0;
const membersListSection = document.getElementById("members-list-section");
const membersListTitle = document.getElementById("members-list-title");

const userTemplate = fetch("../../templates/html/user.html")
    .then(res => res.text())
    .then(text => {
        let article = document.createElement("article");
        article.innerHTML = text;
        article.classList.add("user-card");
        return article;
    })
    .catch(err => console.error("Could not load user template:", err));

const loadUsers = () => {
    fetch("../../locales/users.json")
        .then(res => res.json())
        .then(users => {
            userTemplate.then(template => {
                const fragment = document.createDocumentFragment();
                Object.entries(users).forEach(([userID, userData]) => {
                    fragment.appendChild(buildUserTemplate(template, userID, userData));
                });
                membersListSection.appendChild(fragment);
                updateMembersTitle();
            });
        })
        .catch(err => console.error("Could not load users:", err));
};

const buildUserTemplate = (template, userID, userData) => {
    let userArticle = template.cloneNode(true);
    userArticle.id = userID;

    let usernameLabel = userArticle.querySelector(".user-name");
    usernameLabel.textContent = userData.username;
    usernameLabel.addEventListener("click", () => {
        localStorage.setItem("lastUser", userID);
    });

    let userPhoto = userArticle.querySelector(".user-card-photo");
    userPhoto.innerHTML = "";
    let img = document.createElement("img");
    img.src = userData.photo;
    img.alt = `${userData.username} photo`;
    img.loading = "lazy";
    userPhoto.appendChild(img);

    membersAmount++;
    return userArticle;
};

const updateMembersTitle = () => {
    fetch("../../locales/config.json")
        .then(res => res.json())
        .then(data => {
            membersListTitle.textContent = `${membersAmount} ${data.events["event-members"].title}`;
        })
        .catch(err => console.error("Could not load configuration:", err));
};

loadUsers();
