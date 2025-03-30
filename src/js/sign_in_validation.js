import { loadJSON } from "./common.js";

const fileUsers = Object.entries(await loadJSON("users.json"))
    .map(([id, user]) => ({ id, ...user }));

const storedUsers = localStorage.getItem("users");
const createdUsers = storedUsers ? Object.entries(JSON.parse(storedUsers))
    .map(([id, user]) => ({ id, ...user })) : [];
const userMap = new Map();
fileUsers.forEach(user => userMap.set(user.id, user));
createdUsers.forEach(user => userMap.set(user.id, user));
const users = Array.from(userMap.values());

const errorMessage = await loadJSON("config.json")
    .then(data => data["login"]["error-message"]);

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");

export const applyValidations = () => {
    const submitBtn = document.getElementById("sign-in-btn");
    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const email = document.getElementById("email-input").value;
        const password = document.getElementById("password-input").value;
        const user = users.find((user) => user["e-mail"] === email && user["password"] === password);
        if (!user) {
            const errorContainer = document.getElementById("error-message-container");
            errorContainer.textContent = errorMessage;
            errorContainer.style.display = "block";
        } else {
            localStorage.setItem("user_id", user["id"]);
            const keepLoggedIn = document.getElementById("keep-logged-button").checked;
            localStorage.setItem("keep-logged-in", keepLoggedIn);
            window.location.href = "home_page.html";
        }
    });
};