/********************************************************
 * 1) MENU MOBILE TOGGLE
 ********************************************************/
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

/********************************************************
 * 2) SCROLL SUAVE PARA ÂNCORAS (#)
 ********************************************************/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId !== "#") {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const nav = document.querySelector("nav");
        const offset = nav ? nav.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Fechar menu mobile se estiver aberto
        if (!mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    }
  });
});

/********************************************************
 * 3) EXPANSÃO DOS CARDS
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
 * 4) MODAL DO CURRÍCULO
 ********************************************************/
const curriculoModal = document.getElementById("curriculoModal");

window.openCurriculoModal = function() {
  if (curriculoModal) {
    curriculoModal.style.display = "flex";
  }
};
window.closeCurriculoModal = function() {
  if (curriculoModal) {
    curriculoModal.style.display = "none";
  }
};
// Fecha se clicar fora
window.addEventListener("click", (e) => {
  if (e.target === curriculoModal) {
    closeCurriculoModal();
  }
});

/********************************************************
 * 5) MODAL DE LEADS (Intersection Observer em #contato)
 ********************************************************/
const leadModal = document.getElementById("leadModal");
let modalShown = false;

function showLeadModal() {
  if (!modalShown) {
    modalShown = true;
    leadModal.style.display = "flex";
  }
}
window.closeLeadModal = function() {
  leadModal.style.display = "none";
};

window.enviarLead = function() {
  const name = document.getElementById("leadName").value.trim();
  const email = document.getElementById("leadEmail").value.trim();

  if (!name || !email) {
    alert("Por favor, preencha seu nome e email.");
    return;
  }
  alert(`Obrigado, ${name}! Recebemos seu contato.`);
  closeLeadModal();
};

// Observa a seção #contato para disparar modal
const contatoSection = document.getElementById("contato");
if (contatoSection) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      showLeadModal();
      observer.unobserve(contatoSection);
    }
  }, {
    threshold: 0.4
  });
  observer.observe(contatoSection);
}
