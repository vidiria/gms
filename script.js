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

// ... (seu código anterior) ...

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

// Chamar a função quando clicar no overlay
document.querySelectorAll(".card").forEach((card) => {
    const title = card.querySelector(".card-title");
    const iframe = card.querySelector("iframe");
    const overlay = card.querySelector("#overlay");

    if (title) {
        title.addEventListener("click", () => {
            card.classList.toggle("expanded");
            if (card.classList.contains("expanded")) {
                // Carrega o iframe quando o card é aberto
                if (iframe && !iframe.src) {
                    iframe.src = "onboarding.html";
                }

                // Adiciona um pequeno atraso antes de mostrar o overlay
                setTimeout(() => {
                    toggleOverlayAndInteraction();
                }, 300); // 300ms de atraso
            } else {
                // Se o card está fechado, esconde o overlay
                if (overlay.classList.contains("active")) {
                    toggleOverlayAndInteraction();
                }
            }
        });
    }

    if (overlay) {
        overlay.addEventListener("click", () => {
            toggleOverlayAndInteraction();
        });
    }
});

