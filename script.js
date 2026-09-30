// Change this value to make each section fade-in faster or slower.
const FADE_IN_DURATION_MS = 6500;
// Change this value to make sections start closer together or further apart.
const FADE_IN_STAGGER_MS = 1000;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fadeInSections = document.querySelectorAll(".hero, .overview, .about-section, .tips-section, .site-footer");

if (!prefersReducedMotion && fadeInSections.length > 0) {
  document.documentElement.style.setProperty("--fade-in-duration", `${FADE_IN_DURATION_MS}ms`);
  fadeInSections.forEach((section, index) => {
    section.classList.add("fade-in-section");
    section.style.setProperty("--fade-in-delay", `${index * FADE_IN_STAGGER_MS}ms`);
  });
  document.documentElement.classList.add("fade-in-ready");
}

// The mobile menu opens and closes without taking keyboard users out of navigation.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");

if (menuButton && navigation) {
  document.documentElement.classList.add("menu-ready");
  menuButton.hidden = false;

  const setMenuOpen = (isOpen) => {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    navigation.classList.toggle("is-open", isOpen);
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
}
