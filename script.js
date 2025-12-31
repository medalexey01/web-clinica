// ============================================
// SCRIPT.JS - VERSIÓN ESTABLE MÓVIL
// ============================================

(function () {
  console.log("✅ script.js cargado");

  function abrirModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    // Usamos 'flex' para que respete el estilo flex-start que pusimos en el HTML
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    
    // EVITAMOS modificar el body.style.overflow en móviles para evitar saltos.
    document.body.style.overflow = "hidden"; 
  }

  function cerrarModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    modal.style.display = "none";
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
      modal.addEventListener("click", (e) => {
        if (e.target === modal) cerrarModal();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") cerrarModal();
      });
    }
  });
})();
