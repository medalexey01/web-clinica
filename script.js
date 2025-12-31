// ============================================
// SCRIPT.JS - MODAL DE CITAS (VERSIÓN FINAL)
// ============================================

(function () {
  console.log("✅ script.js cargado correctamente");

  function abrirModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) {
      console.error("❌ No se encontró el modal #modalCita");
      return;
    }

    // 1. Mostrar el modal (Flex para centrar)
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");

    // 2. Bloquear scroll usando overflow (Evita el parpadeo en móviles)
    document.body.style.overflow = "hidden";
  }

  function cerrarModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    // 1. Ocultar modal
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    // 2. Restaurar scroll
    document.body.style.overflow = "";

    // 3. Limpiar formulario
    const form = document.getElementById("formCita");
    if (form) form.reset();
  }

  // ✅ Exponer funciones al navegador para que funcionen los botones onclick
  window.abrirModal = abrirModal;
  window.cerrarModal = cerrarModal;

  // Event Listeners
  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    // Cerrar al hacer clic en el fondo oscuro
    modal.addEventListener("click", (e) => {
      if (e.target === modal) cerrarModal();
    });

    // Cerrar con la tecla ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrarModal();
    });
  });
})();
