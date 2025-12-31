// ============================================
// SCRIPT.JS - VERSIÓN SUPER SIMPLE (ANTI-PARPADEO)
// ============================================

(function () {
  console.log("✅ script.js cargado (Versión Simple)");

  function abrirModal() {
    const modal = document.getElementById("modalCita");
    if (modal) {
      // Solo mostramos el modal usando flex
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
    }
  }

  function cerrarModal() {
    const modal = document.getElementById("modalCita");
    if (modal) {
      // Solo ocultamos el modal
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      
      // Limpiamos el formulario si es necesario
      const form = document.getElementById("formCita");
      if (form) form.reset();
    }
  }

  // Hacer funciones disponibles globalmente
  window.abrirModal = abrirModal;
  window.cerrarModal = cerrarModal;

  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalCita");
    if (modal) {
      // Cerrar al hacer clic fuera
      modal.addEventListener("click", (e) => {
        if (e.target === modal) cerrarModal();
      });
      // Cerrar con Escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") cerrarModal();
      });
    }
  });
})();
