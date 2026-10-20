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
  }

  function cerrarModal() {
    const modal = document.getElementById("modalCita");
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    const form = document.getElementById("formCita");
    if (form) form.reset();
  }

  function toggleMobileMenu() {
    const btn = document.querySelector(".hamburger-btn");
    const menu = document.getElementById("mobileMenu");
    if (!menu || !btn) return;

    const isExpanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", !isExpanded);
    menu.classList.toggle("show-menu");
  }

  window.abrirModal = abrirModal;
  window.cerrarModal = cerrarModal;
  window.toggleMobileMenu = toggleMobileMenu;

  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalCita");
    if (modal) {
      modal.addEventListener("click", (e) => { if (e.target === modal) cerrarModal(); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrarModal(); });
    }


    // ============================================
    // NATIVE REVEAL LOGIC (IntersectionObserver)
    // ============================================
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      threshold: 0.15
    });

    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // BLOG FILTERING & LIVE SEARCH LOGIC
    // ============================================
    const filterBtns = document.querySelectorAll(".filter-btn");
    const articles = document.querySelectorAll("article[data-category]");
    const searchInput = document.getElementById("blogSearch");
    const loadMoreContainer = document.getElementById("loadMoreContainer");
    const loadMoreBtn = document.getElementById("loadMoreBtn");

    if (articles.length > 0) {
      let activeFilter = "all";
      let searchQuery = "";
      let showAllAll = false;

      function applyFilters() {
        let visibleCount = 0;
        const isDefaultView = (activeFilter === "all" && searchQuery === "");

        // FIX hueco filtro blog: quita el min-height:100vh (que evita el salto al cargar)
        // cuando el filtro deja visible menos contenido que una pantalla.
        const masterEl = document.querySelector(".article-master");
        if (masterEl) masterEl.classList.toggle("is-filtered", !isDefaultView);

        articles.forEach(article => {
          const category = article.getAttribute("data-category");
          
          // Get text content to search (title and short description)
          const titleEl = article.querySelector("h3");
          const descEl = article.querySelector("p");
          const textToSearch = ((titleEl ? titleEl.textContent : "") + " " + (descEl ? descEl.textContent : "")).toLowerCase();
          
          const matchesCategory = (activeFilter === "all" || category === activeFilter);
          const matchesSearch = textToSearch.includes(searchQuery);

          if (matchesCategory && matchesSearch) {
            // Fix 2026-08-27: 'Actuales' (filter all) must show ALL matching articles.
            // Removed the previous default-view limit of 3 + 'Cargar más' button.
            article.style.display = "flex";
            setTimeout(() => {
              article.classList.add("active");
            }, 50);
            visibleCount++;
          } else {
            article.style.display = "none";
          }
        });

        // Handle visibility of the Load More button
        // Fix 2026-08-27: no more default limit, so always hide the load-more button.
        if (loadMoreContainer) {
          loadMoreContainer.style.display = "none";
        }
      }

      if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
          btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeFilter = btn.getAttribute("data-filter");
            // Reset the load more flag when changing categories
            showAllAll = false;
            applyFilters();
          });
        });
      }

      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          searchQuery = e.target.value.toLowerCase().trim();
          // Reset load more flag when searching
          showAllAll = false;
          applyFilters();
        });
      }

      if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
          showAllAll = true;
          applyFilters();
        });
      }

      // Initialize the filters on load
      applyFilters();
    }

    // Intercept citas form submission: wait for server response before redirecting
    const apptForm = document.querySelector("#modalCita form");
    if (apptForm) {
      const apptSubmitBtn = apptForm.querySelector('button[type="submit"]');

      // Error message element inside the modal (visible without scrolling, no alert())
      const apptErrorMsg = document.createElement("div");
      apptErrorMsg.id = "apptErrorMsg";
      apptErrorMsg.setAttribute("role", "alert");
      apptErrorMsg.style.cssText =
        "display:none; margin:10px 0 12px; padding:12px 14px; " +
        "background:#fdf0ef; border:1px solid #e8b4b8; border-left:4px solid #c0392b; " +
        "color:#8a1f1f; font-size:14px; line-height:1.5; border-radius:6px; text-align:left;";
      apptErrorMsg.innerHTML =
        'No pudimos enviar su solicitud en este momento. Por favor llámenos al ' +
        '<a href="tel:+17132710622" style="font-weight:600; color:#8a1f1f; text-decoration:underline;">(713) 271-0622</a> ' +
        'o escríbanos por WhatsApp al ' +
        '<a href="https://wa.me/13464827249?text=Hola,%20quiero%20informaci%C3%B3n%20de%20Cl%C3%ADnica%20Hispana%20Am%C3%A9rica" style="font-weight:600; color:#8a1f1f; text-decoration:underline;" target="_blank" rel="noopener">(346) 482-7249</a>.';
      if (apptSubmitBtn) {
        apptForm.insertBefore(apptErrorMsg, apptSubmitBtn);
      } else {
        apptForm.appendChild(apptErrorMsg);
      }

      apptForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Clear any previous error before retry
        apptErrorMsg.style.display = "none";

        const formData = new FormData(apptForm);
        const originalBtnHtml = apptSubmitBtn ? apptSubmitBtn.innerHTML : "";

        // Disable button + indicate sending to prevent double submission
        if (apptSubmitBtn) {
          apptSubmitBtn.disabled = true;
          apptSubmitBtn.textContent = "Enviando...";
        }

        fetch(apptForm.action, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        }).then((res) => {
          if (res.ok) {
            window.location.href = "gracias.html";
          } else {
            // Non-OK response: keep modal open + data, show error
            if (apptSubmitBtn) {
              apptSubmitBtn.disabled = false;
              apptSubmitBtn.innerHTML = originalBtnHtml;
            }
            apptErrorMsg.style.display = "block";
          }
        }).catch((err) => {
          console.log("FormSubmit error: ", err);
          // Fetch/network failure: keep modal open + data, show error
          if (apptSubmitBtn) {
            apptSubmitBtn.disabled = false;
            apptSubmitBtn.innerHTML = originalBtnHtml;
          }
          apptErrorMsg.style.display = "block";
        });
      });
    }

    // Intercept newsletter form submission
    const newsForm = document.getElementById("newsletterForm");
    if (newsForm) {
      newsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const formData = new FormData(newsForm);
        
        // Submit asynchronously in the background
        fetch(newsForm.action, {
          method: "POST",
          body: formData
        }).catch(err => console.log("Subscription error: ", err));
        
        // Immediately redirect to local gracias-suscripcion.html
        window.location.href = "gracias-suscripcion.html";
      });
    }
  });

  // ============================================
  // ANALYTICS LAZY LOADING LOGIC (GA4, Google Ads, Meta Pixel)
  // ============================================
  var analyticsLoaded = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); }

  function lazyLoadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;

    window.removeEventListener('scroll', lazyLoadAnalytics);
    window.removeEventListener('mousemove', lazyLoadAnalytics);
    window.removeEventListener('touchstart', lazyLoadAnalytics);
    window.removeEventListener('click', lazyLoadAnalytics);

    // 1. Google Analytics & Ads

    window.gtag('js', new Date());

    // 2. Meta Pixel Code
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];
    t=b.createElement(e);t.async=!0;
    t.src=v;
    s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}
    (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
    
    window.fbq('init', '424874584720175');
    window.fbq('track', 'PageView');
  }

  window.addEventListener('scroll', lazyLoadAnalytics, { passive: true });
  window.addEventListener('mousemove', lazyLoadAnalytics, { passive: true });
  window.addEventListener('touchstart', lazyLoadAnalytics, { passive: true });
  window.addEventListener('click', lazyLoadAnalytics, { passive: true });
  setTimeout(lazyLoadAnalytics, 5000);

  // ============================================
  // PHONE CLICK INTERCEPTOR
  // ============================================
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a[href^="tel:"]');
    if (el) {
      if (el.getAttribute('onclick') && el.getAttribute('onclick').includes('gtag')) return;
      e.preventDefault();
      var url = el.href;
      var navigated = false;
      function navigate() {
        if (!navigated) {
          navigated = true;
          window.location.href = url;
        }
      }
      gtag('event', 'click_llamar', {
        'event_category': 'contacto',
        'event_label': window.location.pathname,
        'transport_type': 'beacon',
        'event_callback': navigate
      });
      setTimeout(navigate, 800);
    }
  });

})();
