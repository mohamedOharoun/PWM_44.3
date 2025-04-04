import {initEssentials, loadTemplate} from "./common.js";


const loadLoginAndFill = async () => {
    await loadTemplate("privacy_policy.html", "policy_section");
};

const init = async () => {
    await initEssentials();
    await loadLoginAndFill()
}

await init();