import {getLoggedUserID, getURLParameter} from "./utils.js";

export const addListenerToSubmitButton = (submitButton) => {
    submitButton.addEventListener("click", (event) => {
        if (document.getElementById("members-list-section").children.length < 2) {
            document.getElementById("group-members-input").setCustomValidity("At least one member should be added.");
            return;
        } else {
            document.getElementById("group-members-input").setCustomValidity("");
        }

        let groupName = document.getElementById("group-name-input").value;

        if (checkGroupNameExistence(groupName)) {
            document.getElementById("group-name-input").setCustomValidity("This group name already exists!");
            return;
        } else {
            document.getElementById("group-name-input").setCustomValidity("");
        }

        let members = [];
        for (let user of document.getElementById("members-list-section").querySelectorAll("article")) {
            members.push(user.id.replace("user", ""));
        }
        let group = {
            "creator": getLoggedUserID(),
            "photo": document.getElementById("uploaded-img").src,
            "name": groupName,
            "members": members
        }
        let createdGroups = JSON.parse(localStorage.getItem("createdGroups"));
        createdGroups = createdGroups === null ? {} : createdGroups;
        let groupID = getURLParameter(window.location.href, "group_id") ?
            getURLParameter(window.location.href, "group_id") :
            getNextGroupIDFrom(createdGroups);
        createdGroups[groupID] = group;
        localStorage.setItem("createdGroups", JSON.stringify(createdGroups));
    });
};

const checkGroupNameExistence = (groupName) => {
    let groups = JSON.parse(localStorage.getItem("createdGroups"));
    for (let g in groups) if (groups[g]["name"].toLowerCase() === groupName.toLowerCase()) return true;
};

const getNextGroupIDFrom = (createdGroups) => {
    let keys = Object.keys(createdGroups);
    if (keys.length > 0) {
        let currentID = Math.max(...keys.map(k => parseInt(k)));
        return (currentID + 1).toString();
    }
    return "2";
};