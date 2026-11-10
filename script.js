/* =====================================
   NIBEDITA MAHANTA - PORTFOLIO
   JavaScript Interactions
===================================== */


/* ---------- VIDA AI BUDDY ---------- */

const vidaButton = document.getElementById("vida-greet");

const vidaGreeting =
    "Hi! I'm Vida, Nibedita's AI buddy. Welcome to her portfolio!";


if (vidaButton) {

    vidaButton.addEventListener("click", function () {

        // Check browser voice support
        if ("speechSynthesis" in window) {

            // Stop any previous greeting
            window.speechSynthesis.cancel();

            // Create greeting message
            const speech = new SpeechSynthesisUtterance(vidaGreeting);

            // Voice settings
            speech.lang = "en-IN";
            speech.rate = 0.9;
            speech.pitch = 1.05;
            speech.volume = 1;

            // Speak greeting
            window.speechSynthesis.speak(speech);

        } else {

            alert(vidaGreeting);

        }

    });

}


/* ---------- STOP VOICE WHEN LEAVING ---------- */

window.addEventListener("beforeunload", function () {

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

});


/* ---------- CURRENT YEAR IN FOOTER ---------- */

const footer = document.querySelector(".footer p");

if (footer) {
    footer.innerHTML =
        "© " + new Date().getFullYear() +
        " Nibedita Mahanta. Built with curiosity and continuous learning.";
}
