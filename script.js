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

// ... (seu código anterior) ...

// Função para ajustar a altura do iframe com base na seção ativa
function adjustIframeHeight(activeSectionId) {
  const iframe = document.getElementById("onboarding-iframe");
  if (iframe) {
    // Obtém a altura da seção ativa dentro do iframe
    const section = iframe.contentWindow.document.getElementById(activeSectionId);
    if (section) {
      const sectionHeight = section.scrollHeight;
      // Ajusta a altura do iframe, com uma margem de segurança
      iframe.style.height = `${sectionHeight + 25}px`; // 25px de margem
    }
  }
}

// Ouvinte de mensagens do iframe
window.addEventListener("message", (event) => {
  // Verifica se a mensagem é do iframe correto (segurança)
  if (event.source === document.getElementById("onboarding-iframe").contentWindow) {
    const data = event.data;
    if (data && data.type === "activeSection") {
      adjustIframeHeight(data.sectionId);
    }
  }
});

// Chamar a função quando o card for aberto
document.querySelectorAll(".card").forEach((card) => {
  // ... (seu código anterior para abrir o card) ...

  if (card.classList.contains("expanded")) {
    // ... (seu código para carregar o iframe) ...

    // Chama a função para ajustar a altura inicialmente
    setTimeout(() => {
      toggleOverlayAndInteraction();
      // Envia uma mensagem para o iframe requisitando a seção ativa
      document.getElementById("onboarding-iframe").contentWindow.postMessage({ type: "getActiveSection" }, "*");
    }, 300);
  } else {
    // ... (seu código para fechar o card) ...
  }
});
