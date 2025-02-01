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

// Ajuste de altura do iframe (exemplo básico)
const onboardingIframe = document.getElementById("onboarding-iframe");

if (onboardingIframe) {
  onboardingIframe.onload = () => {
    // Tentativa de obter a altura do conteúdo do iframe
    // Isso pode não funcionar em todos os casos devido a restrições de segurança de mesma origem (same-origin policy)
    let height = onboardingIframe.contentWindow.document.body.scrollHeight;
    onboardingIframe.style.height = height + "px";
  };

  //Monitorar mudanças no tamanho da janela
  window.addEventListener('resize', () => {
    let height = onboardingIframe.contentWindow.document.body.scrollHeight;
    onboardingIframe.style.height = height + 'px';
  });
}

// Abrir card e carregar iframe quando clicar no título
document.querySelectorAll(".card").forEach((card) => {
    const title = card.querySelector(".card-title");
    const iframe = card.querySelector("iframe");
    if (title) {
        title.addEventListener("click", () => {
            card.classList.toggle("expanded");
            if (card.classList.contains("expanded")) {
                // Carrega o iframe quando o card é aberto
                if (iframe && !iframe.src) {
                    iframe.src = "onboarding.html";
                }
            }
        });
    }
});
