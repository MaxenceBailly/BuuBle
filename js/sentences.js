import { loadProfile } from "./load-profile.js";

// Function to translate language names to their codes
async function getLanguageCode(languageName) {
    const response = await fetch("./json/languages.json");
    if (!response.ok) {
        throw new Error("Error while loading languages.json");
    }
    const languages = await response.json();
    const language = languages.find(lang => lang.name.toLowerCase() === languageName.toLowerCase());
    return language ? language.code : null;
}

// Function to load sentences
async function loadSentences(fromLanguageCode, toLanguageCode) {
    const response = await fetch(`./sentences/sentences-${fromLanguageCode}-${toLanguageCode}.json`);
    if (!response.ok) {
        throw new Error("Error while loading sentences file");
    }
    return response.json();
}

// Function to display popup
function displayPopup(message) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `<div class="popup-content"><p>${message}</p><button id="close-popup">Close</button></div>`;
    document.body.appendChild(popup);
    document.getElementById("close-popup").addEventListener("click", () => {
        document.body.removeChild(popup);
    });
}

loadProfile(1, false).then(async user => {
    if (user) {
        let fromLanguage = user.motherTongue;
        let toLanguage = user.language;
        console.log(`From Language: ${fromLanguage}, To Language: ${toLanguage}`);

        // Translate language names to codes
        const fromLanguageCode = await getLanguageCode(fromLanguage);
        const toLanguageCode = await getLanguageCode(toLanguage);
        console.log(`From Language Code: ${fromLanguageCode}, To Language Code: ${toLanguageCode}`);

        // Load sentences
        const sentences = await loadSentences(fromLanguageCode, toLanguageCode);
        const sentenceElement = document.getElementById("sentence");
        const answerElement = document.getElementById("answer");
        const checkButton = document.getElementById("check");

        // Display the first sentence
        let currentSentenceIndex = 0;
        sentenceElement.textContent = sentences[currentSentenceIndex].sentence;

        // Check the answer
        checkButton.addEventListener("click", () => {
            const userAnswer = answerElement.value.trim();
            const correctTranslation = sentences[currentSentenceIndex].translation;
            if (userAnswer.toLowerCase() === correctTranslation.toLowerCase()) {
                displayPopup("Correct!");
            } else {
                displayPopup(`Incorrect! The correct translation is: ${correctTranslation}`);
            }
        });
    }
});