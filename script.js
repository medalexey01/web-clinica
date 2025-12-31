// ============================================
// SCRIPT.JS - MODAL DE CITAS (VERSIÓN CORREGIDA)
// ============================================

(function () {
  console.log("✅ script.js cargado correctamente");

  // Variable para guardar la posición del scroll
  let scrollY = 0;

  function abrirModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) {
      console.error("❌ No se encontró el modal #modalCita");
      return;
    }

    // 1. Guardar posición actual del scroll para evitar saltos
    scrollY = window.scrollY;

    // 2. Mostrar el modal forzando el estilo 'flex'
    // (Esto sobreescribe el style="display:none" del HTML)
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");

    // 3. Bloquear el scroll del cuerpo
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
  }

  function cerrarModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    // 1. Ocultar el modal
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    // 2. Restaurar el scroll del cuerpo
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollY);

    // 3. Limpiar el formulario si existe
    const form = document.getElementById("formCita");
    if (form) form.reset();
  }

  // ✅ Exponer funciones al scope global para que los botones onclick funcionen
  window.abrirModal = abrirModal;
  window.cerrarModal = cerrarModal;

  // Event Listeners (cuando el DOM esté listo)
  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    // Cerrar al hacer clic fuera del contenido del modal
    modal.addEventListener("click", (e) => {
      if (e.target === modal) cerrarModal();
    });

    // Cerrar con la tecla ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrarModal();
    });
  });
})();
