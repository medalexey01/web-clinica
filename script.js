// ============================================
// SCRIPT.JS - MODAL DE CITAS (ROBUSTO HOSTINGER)
// ============================================

(function () {
  // Debug (opcional): te ayuda a confirmar que el archivo está cargando.
  // Luego lo puedes borrar si quieres.
  console.log("✅ script.js cargó correctamente");

  function abrirModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) {
      console.error("❌ No existe #modalCita en el HTML");
      return;
    }

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

  // ✅ IMPORTANTE: Exponer funciones al scope global para que onclick funcione SIEMPRE
  window.abrirModal = abrirModal;
  window.cerrarModal = cerrarModal;

  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalCita");
    if (!modal) return;

    // Cerrar clic fuera
    modal.addEventListener("click", (e) => {
      if (e.target === modal) cerrarModal();
    });

    // Cerrar con ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrarModal();
    });
  });
})();
