(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  document.body.classList.remove("is-loading");
  document.body.classList.add("is-ready");

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const header = document.querySelector("[data-header]");
  const headerScene = document.querySelector(".hero, .horse-hero");

  if (header && headerScene && !header.classList.contains("is-solid")) {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        header.classList.toggle("is-scrolled", entry.intersectionRatio < 0.74);
      },
      { threshold: [0, 0.74, 1] }
    );
    headerObserver.observe(headerScene);
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Открыть меню");
    mobileMenu.hidden = true;
    document.body.style.overflow = "";
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const nextOpen = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(nextOpen));
      menuToggle.setAttribute("aria-label", nextOpen ? "Закрыть меню" : "Открыть меню");
      mobileMenu.hidden = !nextOpen;
      document.body.style.overflow = nextOpen ? "hidden" : "";
    });

    mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  }

  const revealItems = document.querySelectorAll(".reveal, .reveal-media");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -4%" }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      const wrapper = image.closest(".horse-image-wrap, .dialog-image-wrap, figure, .hero-media, .horse-hero-media");
      if (wrapper) wrapper.classList.add("image-error");
    });
  });

  const filterButtons = document.querySelectorAll("[data-filter]");
  const horseCards = document.querySelectorAll("[data-category]");
  const emptyState = document.querySelector("[data-empty-state]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      let visibleCount = 0;

      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });

      horseCards.forEach((card) => {
        const categories = (card.dataset.category || "").split(" ");
        const visible = categories.includes(filter);
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  });

  const horseDialog = document.querySelector("#horse-dialog");
  if (horseDialog) {
    const dialogTitle = horseDialog.querySelector("[data-dialog-title]");
    const dialogDetails = horseDialog.querySelector("[data-dialog-details]");
    const dialogStatus = horseDialog.querySelector("[data-dialog-status]");
    const dialogImage = horseDialog.querySelector("[data-dialog-image]");
    const dialogClose = horseDialog.querySelector(".dialog-close");
    const dialogContact = horseDialog.querySelector("[data-dialog-contact]");

    document.querySelectorAll("button.horse-card[data-name]").forEach((card) => {
      card.addEventListener("click", () => {
        const sourceImage = card.querySelector("img");
        dialogTitle.textContent = card.dataset.name || "Лошадь Yeguada MS";
        dialogDetails.textContent = card.dataset.details || "Данные уточняются.";
        dialogStatus.textContent = card.dataset.status || "";
        dialogImage.src = sourceImage ? sourceImage.currentSrc || sourceImage.src : "";
        dialogImage.alt = sourceImage ? sourceImage.alt : "";
        horseDialog.showModal();
        dialogClose.focus();
      });
    });

    dialogClose.addEventListener("click", () => horseDialog.close());
    dialogContact.addEventListener("click", () => horseDialog.close());
    horseDialog.addEventListener("click", (event) => {
      if (event.target === horseDialog) horseDialog.close();
    });
  }

  const visitForm = document.querySelector("#visit-form");
  if (visitForm) {
    const success = visitForm.querySelector(".form-success");
    const summary = visitForm.querySelector("[data-form-summary]");

    visitForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const fields = [visitForm.elements.name, visitForm.elements.contact];
      let valid = true;

      fields.forEach((field) => {
        const row = field.closest(".form-row");
        const error = visitForm.querySelector(`[data-error-for="${field.name}"]`);
        const hasValue = field.value.trim().length > 1;
        row.classList.toggle("is-invalid", !hasValue);
        field.setAttribute("aria-invalid", String(!hasValue));
        error.textContent = hasValue ? "" : "Заполните поле";
        if (!hasValue) valid = false;
      });

      if (!valid) {
        const firstInvalid = visitForm.querySelector("[aria-invalid='true']");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const interest = visitForm.elements.interest;
      const selectedLabel = interest.options[interest.selectedIndex].text;
      summary.textContent = `${visitForm.elements.name.value.trim()}, интерес: ${selectedLabel.toLowerCase()}. Контакт: ${visitForm.elements.contact.value.trim()}.`;
      success.hidden = false;
      success.focus();
    });

    visitForm.querySelectorAll("input").forEach((field) => {
      field.addEventListener("input", () => {
        if (!field.value.trim()) return;
        const row = field.closest(".form-row");
        const error = visitForm.querySelector(`[data-error-for="${field.name}"]`);
        row.classList.remove("is-invalid");
        field.setAttribute("aria-invalid", "false");
        error.textContent = "";
      });
    });
  }

  if (!reducedMotion && !coarsePointer) {
    document.querySelectorAll(".magnetic").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const bounds = button.getBoundingClientRect();
        const x = (event.clientX - bounds.left - bounds.width / 2) * 0.1;
        const y = (event.clientY - bounds.top - bounds.height / 2) * 0.13;
        button.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      button.addEventListener("pointerleave", () => {
        button.style.transform = "translate3d(0, 0, 0)";
      });
    });
  }
})();
