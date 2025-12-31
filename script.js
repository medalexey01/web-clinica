// ============================================
// SCRIPT.JS - MODAL AGENDAR CITA (SIN PARPADEO)
// ============================================

(function () {
  let lastScrollY = 0;

  function abrirModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    lastScrollY = window.scrollY || document.documentElement.scrollTop || 0;

    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");

    // Bloquear scroll de forma estable (sin fixed)
    document.body.style.overflow = "hidden";
  }

  function cerrarModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    // Restaurar scroll
    window.scrollTo(0, lastScrollY);

    const form = document.getElementById("formCita");
    if (form) form.reset();
  }

  // Exponer global para onclick
  window.abrirModal = abrirModal;
  window.cerrarModal = cerrarModal;

  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    // IMPORTANTE:
    // Solo cerrar si haces click EXACTAMENTE en el fondo (overlay),
    // no dentro del contenido del modal.
    modal.addEventListener("click", (e) => {
      if (e.target === modal) cerrarModal();
    });

    // ESC para cerrar
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrarModal();
    });

    // Evita que clicks dentro del cuadro propaguen (extra seguridad)
    const inner = modal.querySelector("div");
    if (inner) {
      inner.addEventListener("click", (e) => e.stopPropagation());
    }
  });
})();
