import {loadTemplate, getPageKey, loadJSON} from "./common.js";
import {buildLinkURL} from "./utils.js";

const fillStepCircles = async () => {
    const currentPage = getPageKey("first");
    const stepMapping = {
        "first": "1",
        "second": "2",
        "third": "3",
        "fourth": "4"
    };
    const reverseStepMapping = {
        "1": "first",
        "2": "second",
        "3": "third",
        "4": "fourth"
    };
    const currentStep = stepMapping[currentPage];

    try {
        const config = await loadJSON("config.json");
        const stepTexts = config["sign-up"]["sign-up-lower-info"]["steps-info"];

        document.querySelectorAll(".step-circle").forEach(circle => {
            const stepNumber = circle.getAttribute("data-step");

            circle.addEventListener("click", (evt) => {
               evt.preventDefault();
               window.location.href = buildLinkURL(window.location.href, "page_key", reverseStepMapping[stepNumber]);
            });

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

export const loadStepCirclesAndFill = async () => {
    await loadTemplate("../../templates/html/stepper.html", "step-information-container");

    if (document.getElementById("step-information-container") && document.getElementById("circles-container")) {
        await fillStepCircles();
    }
};
