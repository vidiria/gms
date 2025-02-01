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
 * CARD EXPANSÍVEL, OVERLAY E IFRAME
 ********************************************************/
// Função para mostrar/ocultar o overlay e ativar a interação
function toggleOverlayAndInteraction() {
  const overlay = document.getElementById("overlay");
  const iframe = document.getElementById("onboarding-iframe");

  if (overlay && iframe) {
    overlay.classList.toggle("active");

    // Ativar/desativar interação com o iframe
    if (overlay.classList.contains("active")) {
      iframe.style.pointerEvents = "none"; // Desativa a interação
    } else {
      iframe.style.pointerEvents = "auto"; // Reativa a interação
    }
  }
}

// Abrir card, carregar iframe e gerenciar overlay
document.querySelectorAll(".card").forEach((card) => {
  const title = card.querySelector(".card-title");
  const content = card.querySelector(".card-content"); // Adicionado para manipular a abertura/fechamento
  const iframe = card.querySelector("iframe");
  const overlay = card.querySelector("#overlay");

  if (title) {
    title.addEventListener("click", () => {
      // Toggle para abrir/fechar o card
      card.classList.toggle("expanded");

      // Manipular o iframe e o overlay somente se o card estiver expandido
      if (card.classList.contains("expanded")) {
        // 1. Carrega o iframe quando o card é aberto
        if (iframe && !iframe.src) {
          iframe.src = "onboarding.html";
        }

        // 2. Adiciona um pequeno atraso antes de mostrar o overlay
        setTimeout(() => {
          toggleOverlayAndInteraction();
        }, 300); // 300ms de atraso
      } else {
        // 3. Se o card está fechado, esconde o overlay
        if (overlay.classList.contains("active")) {
          toggleOverlayAndInteraction();
        }
      }
    });
  }

  // 4. Clique no overlay para interagir com o iframe
  if (overlay) {
    overlay.addEventListener("click", () => {
      toggleOverlayAndInteraction();
    });
  }
});
