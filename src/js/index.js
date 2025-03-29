import {initEssentials} from "./common.js";

document.querySelector('a[href="#features-info-section"]').addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector('#features-info-section');
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

document.getElementById("get-started-button").addEventListener("click", function() {
    window.location.href = "../../pages/html/sign_up.html";
});

await initEssentials();