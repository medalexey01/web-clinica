// ============================================
// SCRIPT.JS - MODAL AGENDAR CITA (UNIFICADO)
// ============================================

(function () {
  function abrirModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    // Guardar scroll actual
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    modal.dataset.scrollY = String(scrollY);

    // Mostrar modal
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");

    // Bloquear scroll sin “salto”
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
  }

  function cerrarModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    // Ocultar modal
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    // Restaurar scroll
    const scrollY = parseInt(modal.dataset.scrollY || "0", 10);
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollY);

    // Reset form
    const form = document.getElementById("formCita");
    if (form) form.reset();
  }

  // Exponer global para onclick
  window.abrirModal = abrirModal;
  window.cerrarModal = cerrarModal;

  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    // Cerrar con ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrarModal();
    });

    // Cerrar clic fuera
    modal.addEventListener("click", (e) => {
      if (e.target === modal) cerrarModal();
    });
  });
})();

