
/* =========================================
   NIBEDITA MAHANTA - PORTFOLIO
   JavaScript + VIDA AI CHAT
========================================= */


/* ---------- DOM ELEMENTS ---------- */

const vidaGreetButton = document.getElementById("vida-greet");

const vidaChatForm = document.getElementById("vida-chat-form");
const vidaMessages = document.getElementById("vida-messages");
const vidaInput = document.getElementById("vida-input");
const vidaSendButton = document.getElementById("vida-send");

const footerText = document.querySelector(".footer p");


/* ---------- FOOTER CURRENT YEAR ---------- */

if (footerText) {
    footerText.textContent =
        `© ${new Date().getFullYear()} Nibedita Mahanta. All Rights Reserved.`;
}


/* ---------- VIDA VOICE GREETING ---------- */

if (vidaGreetButton) {

    vidaGreetButton.addEventListener("click", function () {

        const greeting =
            "Hi! I'm Vida, Nibedita's AI buddy. Welcome to her portfolio!";

        if ("speechSynthesis" in window) {

            window.speechSynthesis.cancel();

            const speech = new SpeechSynthesisUtterance(greeting);

            speech.lang = "en-IN";
            speech.rate = 0.9;
            speech.pitch = 1.05;
            speech.volume = 1;

            window.speechSynthesis.speak(speech);

        } else {

            alert(greeting);

        }

    });

}


/* ---------- VIDA CHAT MESSAGE ---------- */

function addVidaMessage(message, sender) {

    if (!vidaMessages) return;

    const messageElement = document.createElement("div");

    messageElement.classList.add("vida-message");

    if (sender === "user") {
        messageElement.classList.add("user-message");
    } else {
        messageElement.classList.add("bot-message");
    }

    // textContent prevents HTML injection
    messageElement.textContent = message;

    vidaMessages.appendChild(messageElement);

    // Automatically scroll to latest message
    vidaMessages.scrollTop = vidaMessages.scrollHeight;

}


/* ---------- VIDA CHAT API CONFIGURATION ---------- */

// Backend API will be connected here.
// Keep this empty for now: the Spring Boot backend
// and its public deployment URL are not ready yet.

const VIDA_API_URL = "";


/* ---------- GET VIDA AI RESPONSE ---------- */

async function getVidaResponse(userMessage) {

    const response = await fetch(
        `${VIDA_API_URL}/api/vida/chat`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: userMessage
            })
        }
    );

    if (!response.ok) {
        throw new Error("Vida API connection failed.");
    }

    const data = await response.json();

    // Accept common backend response field names
    const reply = data.reply || data.message || data.response;

    if (!reply) {
        throw new Error("Vida response was empty.");
    }

    return reply;

}


/* ---------- VIDA CHAT FORM ---------- */

if (vidaChatForm && vidaInput) {

    vidaChatForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const userMessage = vidaInput.value.trim();

        // Ignore empty messages
        if (userMessage === "") {
            return;
        }

        // Display user's message
        addVidaMessage(userMessage, "user");

        // Clear input
        vidaInput.value = "";

        // Disable button while waiting
        if (vidaSendButton) {
            vidaSendButton.disabled = true;
            vidaSendButton.textContent = "Sending...";
        }

        try {

            // Request answer from Spring Boot backend
            const vidaReply = await getVidaResponse(userMessage);

            addVidaMessage(vidaReply, "bot");

        } catch (error) {

            console.error("Vida Chat Error:", error);

            addVidaMessage(
                "I'm currently unable to connect to my AI service. My backend connection is still being set up. Please visit Nibedita's Contact section for now!",
                "bot"
            );

        } finally {

            // Enable button again
            if (vidaSendButton) {
                vidaSendButton.disabled = false;
                vidaSendButton.textContent = "Send";
            }

            vidaInput.focus();

        }

    });

}


/* ---------- CANCEL SPEECH WHEN LEAVING ---------- */

window.addEventListener("beforeunload", function () {

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

});
