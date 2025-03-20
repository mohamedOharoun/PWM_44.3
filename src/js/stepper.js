import { loadTemplate } from "./main.js";

await loadTemplate("../../templates/html/footer.html", "page-footer");

const fillStepCircles = async () => {
    const currentPage = window.location.pathname.split("/").pop();
    const stepMapping = {
        "sign_up_first_step_page.html": "1",
        "sign_up_second_step_page.html": "2",
        "sign_up_third_step_page.html": "3",
        "sign_up_fourth_step_page.html": "4"
    };
    const currentStep = stepMapping[currentPage];

    try {
        const response = await fetch("../../db/config.json");
        const config = await response.json();
        const stepTexts = config["sign-up"]["sign-up-lower-info"]["steps-info"];

        document.querySelectorAll(".step-circle").forEach(circle => {
            const stepNumber = circle.getAttribute("data-step");

            if (stepNumber === currentStep) {
                circle.classList.remove("step-circle-non-focused");
            } else {
                circle.classList.add("step-circle-non-focused");
            }
        });

        document.querySelectorAll(".step-info").forEach((infoSpan, index) => {
            const stepNumber = (index + 1).toString();
            const stepName = Object.keys(stepTexts)[index];
            infoSpan.textContent = stepTexts[stepName] || "Step Info";

            if (stepNumber === currentStep) {
                infoSpan.classList.remove("step-circle-non-focused");
            } else {
                infoSpan.classList.add("step-circle-non-focused");
            }
        });

        const stepContainer = document.getElementById("step-information-container");
        const circlesContainer = document.getElementById("circles-container");
        if (stepContainer && circlesContainer) {
            stepContainer.innerHTML = "";
            stepContainer.appendChild(circlesContainer);
        }
    } catch (error) {
        console.error("Error loading step information:", error);
    }
};

const loadStepCirclesAndFill = async () => {
    await loadTemplate("../../templates/html/stepper.html", "step-information-container");

    if (document.getElementById("step-information-container") && document.getElementById("circles-container")) {
        await fillStepCircles();
    }
};

await loadStepCirclesAndFill();
