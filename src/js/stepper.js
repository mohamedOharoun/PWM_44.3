import { loadTemplate, getPageKey } from "./common.js";

const fillStepCircles = async () => {
    const currentPage = getPageKey("first");
    const stepMapping = {
        "first": "1",
        "second": "2",
        "third": "3",
        "fourth": "4"
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
