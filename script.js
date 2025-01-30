/********************************************************
 * MENU MOBILE
 ********************************************************/
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

/********************************************************
 * SCROLL SUAVE
 ********************************************************/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const targetId = this.getAttribute("href");
    if (targetId !== "#") {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const nav = document.querySelector("nav");
        const offset = nav ? nav.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });

        if (!mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    }
  });
});

/********************************************************
 * CARD EXPANSION
 ********************************************************/
document.querySelectorAll(".card").forEach((card) => {
  const title = card.querySelector(".card-title");
  if (title) {
    title.addEventListener("click", () => {
      card.classList.toggle("expanded");
    });
  }
});

/********************************************************
 * MODAL CURRÍCULO
 ********************************************************/
const curriculoModal = document.getElementById("curriculoModal");
window.openCurriculoModal = function() {
  if (curriculoModal) curriculoModal.style.display = "flex";
};
window.closeCurriculoModal = function() {
  if (curriculoModal) curriculoModal.style.display = "none";
};
window.addEventListener("click", (e) => {
  if (e.target === curriculoModal) closeCurriculoModal();
});

