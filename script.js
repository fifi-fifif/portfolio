// Bouton retour en haut
const topBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

// Effet fade-in
const sections = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Fonction pour activer/désactiver le mode sombre
function toggleDarkMode() {
  const body = document.body;
  const toggleBtn = document.getElementById('themeToggle');

  const isDark = body.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // Change l’icône du bouton
  if (toggleBtn) {
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
  }
}

// Appliquer le thème au chargement
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const toggleBtn = document.getElementById('themeToggle');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (toggleBtn) toggleBtn.textContent = '☀️';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleDarkMode);
  }
});

// Détection de la langue depuis <html lang="...">
const lang = document.documentElement.lang;

// Définir les phrases en fonction de la langue
let phrases = [];

switch (lang) {
  case "fr":
    phrases = ["Développeur Web", "Créateur d'expériences", "Passionné de tech"];
    break;
  case "en":
    phrases = ["Web Developer", "Experience Creator", "Tech Enthusiast"];
    break;
  case "ar":
    phrases = ["مطور ويب", "صانع تجارب", "عاشق للتقنية"];
    break;
  default:
    phrases = ["Développeur Web"];
}

// Animation de texte tapé
let i = 0, j = 0;
let current = "", isDeleting = false;

function type() {
  current = phrases[i];
  document.getElementById("typedText").textContent = current.substring(0, j);

  if (!isDeleting && j < current.length) {
    j++;
    setTimeout(type, 100);
  } else if (isDeleting && j > 0) {
    j--;
    setTimeout(type, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) i = (i + 1) % phrases.length;
    setTimeout(type, 1000);
  }
}

type();

