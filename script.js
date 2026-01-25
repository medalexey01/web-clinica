// ============================================
// SCRIPT.JS - CLÍNICA HISPANA AMÉRICA
// ============================================

(function () {
  console.log("✅ script.js cargó correctamente");

  function abrirModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) return;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function cerrarModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    const form = document.getElementById("formCita");
    if (form) form.reset();
  }

  window.abrirModal = abrirModal;
  window.cerrarModal = cerrarModal;

  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalCita");
    if (modal) {
      modal.addEventListener("click", (e) => { if (e.target === modal) cerrarModal(); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrarModal(); });
    }

    // ============================================
    // CUSTOM CURSOR LOGIC
    // ============================================
    const cursorDot = document.getElementById("cursor-dot");
    const cursorOutline = document.getElementById("cursor-outline");

    if (cursorDot && cursorOutline && window.innerWidth > 1024) {
      window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Movimiento instantáneo para el punto
        cursorDot.style.transform = `translate(${posX - 4}px, ${posY - 4}px)`;

        // Movimiento con ligero retraso para el halo (vía CSS transition)
        cursorOutline.style.transform = `translate(${posX - 20}px, ${posY - 20}px)`;
      });

      // Efecto al pasar sobre elementos interactivos
      const links = document.querySelectorAll("a, button, .card, .float-btn");
      links.forEach(link => {
        link.addEventListener("mouseenter", () => {
          cursorOutline.style.transform += " scale(1.5)";
          cursorOutline.style.backgroundColor = "rgba(14, 165, 233, 0.1)";
        });
        link.addEventListener("mouseleave", () => {
          cursorOutline.style.backgroundColor = "transparent";
        });
      });
    }

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 1000, once: true });
    }
  });
})();
