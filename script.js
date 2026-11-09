
// ELEMENTS
const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");
const mainContent = document.getElementById("mainContent");

const gift = document.getElementById("gift");
const giftMessage = document.getElementById("giftMessage");
const giftHint = document.getElementById("giftHint");

const celebrateBtn = document.getElementById("celebrateBtn");
const finalWish = document.getElementById("finalWish");

const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("birthdayMusic");


// INTRO TRANSITION
enterBtn.addEventListener("click", () => {

    intro.classList.add("hide");

    mainContent.classList.add("visible");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    revealObserver.observe(
        document.querySelectorAll(".reveal")
    );

});


// GIFT ANIMATION
gift.addEventListener("click", () => {

    gift.classList.toggle("open");

    if (gift.classList.contains("open")) {

        giftMessage.classList.add("show");

        giftHint.textContent = "A LITTLE MESSAGE FOR YOU ❤️";

        createConfetti(45);

    } else {

        giftMessage.classList.remove("show");

        giftHint.textContent = "TAP THE GIFT TO OPEN IT";

    }

});


// SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
});


// MUSIC CONTROL
let musicPlaying = false;

musicBtn.addEventListener("click", async () => {

    if (!musicPlaying) {

        try {
            await music.play();

            musicPlaying = true;
            musicBtn.innerHTML = "♫ <span>Music On</span>";

        } catch (error) {
            musicBtn.innerHTML = "♫ <span>Try Again</span>";
        }

    } else {

        music.pause();

        musicPlaying = false;

        musicBtn.innerHTML = "♫ <span>Music Off</span>";

    }

});


// CELEBRATION
celebrateBtn.addEventListener("click", () => {

    createConfetti(180);

    finalWish.classList.add("show");

    celebrateBtn.textContent = "A DAY TO REMEMBER ❤️";

    setTimeout(() => {
        celebrateBtn.textContent = "Let's Celebrate! ✨";
    }, 3000);

});


// CONFETTI GENERATOR
function createConfetti(amount) {

    const colors = [
        "#d9b779",
        "#f5dfb0",
        "#ffffff",
        "#b88b4a",
        "#e8c987"
    ];

    for (let i = 0; i < amount; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti-piece";

        piece.style.left = Math.random() * 100 + "vw";

        piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDuration =
            (Math.random() * 2 + 2) + "s";

        piece.style.animationDelay =
            Math.random() * 0.8 + "s";

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 5000);

    }

}


// GOLD PARTICLE BACKGROUND
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    particles = Array.from({ length: 65 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.6 + 0.2
    }));

}

function animateParticles() {

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach(p => {

        p.y -= p.speed;

        if (p.y < 0) {
            p.y = window.innerHeight;
            p.x = Math.random() * window.innerWidth;
        }

        ctx.beginPath();

        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(217,183,121,${p.opacity})`;

        ctx.shadowBlur = 12;
        ctx.shadowColor = "#d9b779";

        ctx.fill();

    });

    ctx.shadowBlur = 0;

    requestAnimationFrame(animateParticles);

}

resizeCanvas();
animateParticles();

window.addEventListener("resize", resizeCanvas);

