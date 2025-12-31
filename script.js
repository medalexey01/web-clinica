// ============================================
// script.js - MODAL AGENDAR (FORZAR FOCO + ESTABLE)
// ============================================

(function () {
  let lastScrollY = 0;

  function abrirModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    lastScrollY = window.scrollY || 0;

    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    // ✅ FORZAR FOCO EN EL PRIMER INPUT
    setTimeout(() => {
      const first = modal.querySelector('input[name="nombre"]');
      if (first) first.focus();
    }, 50);
  }

  function cerrarModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
    window.scrollTo(0, lastScrollY);

    const form = document.getElementById("formCita");
    if (form) form.reset();
  }

  window.abrirModal = abrirModal;
  window.cerrarModal = cerrarModal;

  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrarModal();
    });
  });
})();
