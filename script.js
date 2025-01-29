 <!-- SCRIPT -->
  <script>
    // Seleciona elementos
    const openChatBtn = document.getElementById('open-chat');
    const chatModal   = document.getElementById('chatModal');
    const optionsModal = document.getElementById('optionsModal');

    // 1) Quando clicar em "Abrir Chat", mostra a Modal de LEAD
    openChatBtn.addEventListener('click', () => {
      chatModal.style.display = 'flex'; // ou 'block'
    });

    // 2) Fechar modal1 (captura de leads)
    function closeModal1() {
      chatModal.style.display = 'none';
    }
    // 3) Fechar modal2 (opções)
    function closeModal2() {
      optionsModal.style.display = 'none';
    }

    // 4) Capturar leads e abrir o modal de opções
    function captureLead() {
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!name || !email) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      // Você pode enviar esses dados para seu backend, se quiser
      // ex: fetch('/api/leads', { method: 'POST', body: JSON.stringify({ name, email }) })

      alert(`Obrigado, ${name}! Vamos te direcionar...`);
      // Fecha o primeiro modal
      chatModal.style.display = 'none';
      // Abre o segundo modal
      optionsModal.style.display = 'flex';
    }

    // 5) Opções do modal 2
    function goWhatsapp() {
      // Redireciona para o link do WhatsApp
      window.location.href = 'https://wa.me/+5511976965550';
    }
    function goFAQ() {
      // Leva para a âncora FAQ da própria página
      window.location.href = '#faq';
      // Fecha o modal
      optionsModal.style.display = 'none';
    }

    // Torna as funções acessíveis globalmente, se você quiser chamar inline
    window.closeModal1 = closeModal1;
    window.closeModal2 = closeModal2;
    window.captureLead = captureLead;
    window.goWhatsapp = goWhatsapp;
    window.goFAQ = goFAQ;

    // Fechar modais se clicar fora do conteúdo
    window.addEventListener('click', (e) => {
      if (e.target === chatModal) {
        closeModal1();
      } else if (e.target === optionsModal) {
        closeModal2();
      }
    });
  </script>
</body>
</html>
