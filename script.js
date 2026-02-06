// MOBILE NAV TOGGLE (SAFE ADDITION)
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector("nav");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

const mobileNavLinks = document.querySelectorAll("nav a");

mobileNavLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});

// Active menu highlight on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
// Scroll-down button functionality
const scrollDownBtn = document.getElementById("scrollDown");
const aboutSection = document.getElementById("about");

if (scrollDownBtn && aboutSection) {
  scrollDownBtn.addEventListener("click", () => {
    aboutSection.scrollIntoView({
      behavior: "smooth"
    });
  });
}

// PROJECT SEARCH
const searchInput = document.getElementById("projectSearch");
const projectCards = document.querySelectorAll(".project-card");
const projectCount = document.getElementById("projectCount");

searchInput.addEventListener("input", () => {
  let visible = 0;
  const value = searchInput.value.toLowerCase();

  projectCards.forEach(card => {
    const text = card.innerText.toLowerCase();
    if (text.includes(value)) {
      card.style.display = "block";
      visible++;
    } else {
      card.style.display = "none";
    }
  });

  projectCount.textContent = visible;
});

// REFRESH
document.getElementById("refreshProjects").addEventListener("click", () => {
  searchInput.value = "";
  projectCards.forEach(card => (card.style.display = "block"));
  projectCount.textContent = projectCards.length;
});
// LANGUAGE FILTER
const languageBtn = document.getElementById("languageBtn");
const languageDropdown = document.getElementById("languageDropdown");
const projectCardsLang = document.querySelectorAll(".project-card");

// Toggle dropdown
languageBtn.addEventListener("click", () => {
  languageDropdown.style.display =
    languageDropdown.style.display === "block" ? "none" : "block";
});

// Filter by language
languageDropdown.querySelectorAll("li").forEach(item => {
  item.addEventListener("click", () => {
    const lang = item.dataset.lang;
    let visible = 0;

    projectCardsLang.forEach(card => {
      if (lang === "all" || card.dataset.lang.includes(lang)) {
        card.style.display = "block";
        visible++;
      } else {
        card.style.display = "none";
      }
    });

    document.getElementById("projectCount").textContent = visible;
    languageDropdown.style.display = "none";
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
    languageDropdown.style.display = "none";
  }
});


const words = ["ENGINEER", "AWS", "CLOUD"];
const typingElement = document.getElementById("typing-text");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingElement.textContent = currentWord.slice(0, charIndex++);
    if (charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingElement.textContent = currentWord.slice(0, charIndex--);
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 120);
}

document.addEventListener("DOMContentLoaded", typeEffect);

// Always start from top (Home) on page refresh
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

window.onload = () => {
  window.scrollTo(0, 0);
  history.replaceState(null, null, " ");
};

/* ===== PARTICLE / SNOW BACKGROUND ===== */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particlesArray = [];
const numberOfParticles = 80;

/* Resize canvas */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* Particle class */
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.8 + 0.5;
    this.speedY = Math.random() * 0.4 + 0.1;
    this.speedX = Math.random() * 0.2 - 0.1;
    this.opacity = Math.random() * 0.6 + 0.2;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
  }
}

/* Init particles */
function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}
initParticles();

/* Animate */
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

