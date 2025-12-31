// ============================================
// SCRIPT.JS - MODAL DE CITAS (SIN PARPADEO)
// ============================================

(function () {
  console.log("✅ script.js cargado correctamente");

  function abrirModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) {
      console.error("❌ No se encontró el modal #modalCita");
      return;
    }

    // 1. Mostrar el modal (flex para centrar)
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");

    // 2. SOLUCIÓN AL PARPADEO:
    // En lugar de 'position: fixed', usamos 'overflow: hidden'.
    // Esto evita que la página de fondo se mueva, pero permite
    // que el teclado del celular suba sin causar saltos visuales.
    document.body.style.overflow = "hidden";
  }

  function cerrarModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    // 1. Ocultar modal
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    // 2. Restaurar el scroll de la página
    document.body.style.overflow = "";

    // 3. Limpiar formulario (opcional)
    const form = document.getElementById("formCita");
    if (form) form.reset();
  }

  // ✅ Exponer funciones globalmente
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
