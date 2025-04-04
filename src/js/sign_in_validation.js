import { loadJSON } from "./common.js";

const getLocalUsers = () => {
    let localUsers = localStorage.getItem("users");
    return JSON.parse(localUsers ? localUsers : "{}");
};

const users = {...Object.fromEntries(
    Object.entries(await loadJSON("users.json"))
), ...getLocalUsers()};

const errorMessage = await loadJSON("config.json")
    .then(data => data["login"]["error-message"]);

export const applyValidations = () => {
    const submitBtn = document.getElementById("sign-in-btn");
    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const email = document.getElementById("email-input").value;
        const password = document.getElementById("password-input").value;
        const user = Object.entries(users).find(
            userData => {
                return userData[1]["e-mail"] === email &&
                userData[1]["password"] === password
            }
        );
        if (!user) {
            const errorContainer = document.getElementById("error-message-container");
            errorContainer.textContent = errorMessage;
            errorContainer.style.display = "block";
        } else {
            localStorage.setItem("user_id", user[0]);
            const keepLoggedIn = document.getElementById("keep-logged-button").checked;
            localStorage.setItem("keep-logged-in", keepLoggedIn);
            window.location.href = "home_page.html";
        }
    });
};