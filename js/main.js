/* ==========================================================================
   AgroDique Soluções — comportamento do site
   ========================================================================== */

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ------------------------------------------------------------------
     Navegação móvel
     ------------------------------------------------------------------ */

  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     Sombra do cabeçalho ao rolar
     ------------------------------------------------------------------ */

  var header = document.querySelector(".site-header");

  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
     Animação de entrada ao rolar (IntersectionObserver)
     ------------------------------------------------------------------ */

  var revealItems = document.querySelectorAll(".reveal");

  if (revealItems.length) {
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px" }
      );

      revealItems.forEach(function (item) {
        observer.observe(item);
      });
    } else {
      revealItems.forEach(function (item) {
        item.classList.add("visible");
      });
    }
  }

  /* ------------------------------------------------------------------
     Lightbox da galeria de projetos
     ------------------------------------------------------------------ */

  var lightbox = document.getElementById("lightbox");

  if (lightbox) {
    var lbThumb = lightbox.querySelector(".thumb");
    var lbDefaultContent = lbThumb.innerHTML;
    var lbTitle = lightbox.querySelector("[data-lb-title]");
    var lbDesc = lightbox.querySelector("[data-lb-desc]");
    var lbClose = lightbox.querySelector(".lightbox-close");
    var lastFocused = null;

    var openLightbox = function (item) {
      var thumb = item.querySelector(".thumb");
      var title = item.querySelector(".gallery-caption strong");
      var desc = item.querySelector(".gallery-caption span");

      lbThumb.className = "thumb " + (thumb ? thumb.className.replace("thumb", "").trim() : "tone-1");
      var photo = thumb ? thumb.querySelector("img") : null;
      if (photo) {
        lbThumb.innerHTML = "";
        var enlargedPhoto = photo.cloneNode(true);
        enlargedPhoto.loading = "eager";
        lbThumb.appendChild(enlargedPhoto);
      } else {
        lbThumb.innerHTML = lbDefaultContent;
      }
      lbTitle.textContent = title ? title.textContent : "";
      lbDesc.textContent = desc ? desc.textContent : "";

      lastFocused = document.activeElement;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      lbClose.focus();
    };

    var closeLightbox = function () {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    };

    document.querySelectorAll(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function () {
        openLightbox(item);
      });
    });

    lbClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
      }
    });
  }

  /* ------------------------------------------------------------------
     Formulário de contato
     Envia a mensagem pelo WhatsApp do comercial, com validação e
     consentimento LGPD. Para envio por e-mail, basta configurar um
     serviço (ex.: Formspree/Netlify Forms) — ver README.md.
     ------------------------------------------------------------------ */

  var form = document.getElementById("contact-form");

  if (form) {
    var WA_NUMBER = "5595991323544";
    var status = document.getElementById("form-status");

    var setError = function (field, invalid) {
      field.closest(".field, .consent").classList.toggle("invalid", invalid);
    };

    var validate = function () {
      var valid = true;

      var nome = form.elements.namedItem("nome");
      if (nome.value.trim().length < 2) { setError(nome, true); valid = false; } else { setError(nome, false); }

      var telefone = form.elements.namedItem("telefone");
      var digits = telefone.value.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 11) { setError(telefone, true); valid = false; } else { setError(telefone, false); }

      var email = form.elements.namedItem("email");
      if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        setError(email, true); valid = false;
      } else { setError(email, false); }

      var tipo = form.elements.namedItem("tipo");
      if (!tipo.value) { setError(tipo, true); valid = false; } else { setError(tipo, false); }

      var mensagem = form.elements.namedItem("mensagem");
      if (mensagem.value.trim().length < 10) { setError(mensagem, true); valid = false; } else { setError(mensagem, false); }

      var consent = form.elements.namedItem("consentimento");
      var consentWrap = consent.closest(".consent");
      if (!consent.checked) {
        consentWrap.classList.add("invalid");
        var consentErr = consentWrap.querySelector(".error");
        if (consentErr) consentErr.style.display = "block";
        valid = false;
      } else {
        consentWrap.classList.remove("invalid");
        var consentErr2 = consentWrap.querySelector(".error");
        if (consentErr2) consentErr2.style.display = "";
      }

      return valid;
    };

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      /* Proteção anti-spam: campo escondido (honeypot) deve ficar vazio */
      if (form.elements.namedItem("website").value) {
        status.className = "form-status err show";
        status.textContent = "Não foi possível enviar o formulário. Tente novamente.";
        return;
      }

      if (!validate()) {
        status.className = "form-status err show";
        status.textContent = "Revise os campos destacados antes de continuar.";
        var firstInvalid = form.querySelector(".invalid input, .invalid select, .invalid textarea");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var text =
        "Olá! Conheci a AgroDique pelo site e gostaria de solicitar um orçamento para meu projeto.\n\n" +
        "*Nome:* " + form.elements.namedItem("nome").value.trim() + "\n" +
        "*Telefone:* " + form.elements.namedItem("telefone").value.trim() + "\n" +
        "*E-mail:* " + (form.elements.namedItem("email").value.trim() || "não informado") + "\n" +
        "*Serviço:* " + form.elements.namedItem("tipo").value + "\n\n" +
        "*Mensagem:*\n" + form.elements.namedItem("mensagem").value.trim();

      var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);

      status.className = "form-status ok show";
      status.textContent = "Tudo certo! Estamos abrindo o WhatsApp com sua mensagem para o nosso time comercial.";

      window.open(url, "_blank", "noopener");

      form.reset();
    });
  }

  /* ------------------------------------------------------------------
     Ano atual no rodapé
     ------------------------------------------------------------------ */

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
