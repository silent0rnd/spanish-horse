(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  const sectionNavLinks = Array.from(
    document.querySelectorAll('.desktop-nav a[href^="#"], #mobile-menu a[href^="#"]')
  );
  const sectionNavTargets = Array.from(document.querySelectorAll("main > section[id]"));

  if (sectionNavLinks.length && sectionNavTargets.length && "IntersectionObserver" in window) {
    const setActiveSection = (sectionId) => {
      sectionNavLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${sectionId}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
        if (activeEntry) setActiveSection(activeEntry.target.id);
      },
      { rootMargin: "-34% 0px -56% 0px", threshold: 0 }
    );

    sectionNavTargets.forEach((section) => sectionObserver.observe(section));
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
    const canUseViewTransition = !reducedMotion && typeof document.startViewTransition === "function";
    let activeHorseCard = null;

    const clearPortraitTransition = (sourceImage) => {
      if (sourceImage) sourceImage.style.removeProperty("view-transition-name");
      dialogImage.style.removeProperty("view-transition-name");
    };

    const closeHorseDialog = () => {
      if (!horseDialog.open) return;
      const sourceImage = activeHorseCard ? activeHorseCard.querySelector("img") : null;

      if (!canUseViewTransition || !sourceImage) {
        horseDialog.close();
        clearPortraitTransition(sourceImage);
        activeHorseCard = null;
        return;
      }

      dialogImage.style.viewTransitionName = "horse-portrait";
      sourceImage.style.viewTransitionName = "none";

      const transition = document.startViewTransition(() => {
        horseDialog.close();
        dialogImage.style.viewTransitionName = "none";
        sourceImage.style.viewTransitionName = "horse-portrait";
      });

      transition.finished.finally(() => {
        clearPortraitTransition(sourceImage);
        activeHorseCard = null;
      });
    };

    document.querySelectorAll("button.horse-card[data-name]").forEach((card) => {
      card.addEventListener("click", async () => {
        const sourceImage = card.querySelector("img");
        activeHorseCard = card;
        dialogTitle.textContent = card.dataset.name || "Лошадь Yeguada MS";
        dialogDetails.textContent = card.dataset.details || "Данные уточняются.";
        dialogStatus.textContent = card.dataset.status || "";
        dialogImage.src = sourceImage ? sourceImage.currentSrc || sourceImage.src : "";
        dialogImage.alt = sourceImage ? sourceImage.alt : "";

        if (dialogImage.decode) {
          try {
            await dialogImage.decode();
          } catch (_) {
            // Browser will still display the cached or fallback image.
          }
        }

        if (!canUseViewTransition || !sourceImage) {
          horseDialog.showModal();
          dialogClose.focus();
          return;
        }

        sourceImage.style.viewTransitionName = "horse-portrait";
        dialogImage.style.viewTransitionName = "horse-portrait";

        const transition = document.startViewTransition(() => {
          horseDialog.showModal();
          sourceImage.style.viewTransitionName = "none";
        });

        transition.ready.then(() => dialogClose.focus()).catch(() => dialogClose.focus());
        transition.finished.finally(() => clearPortraitTransition(sourceImage));
      });
    });

    dialogClose.addEventListener("click", closeHorseDialog);
    dialogContact.addEventListener("click", () => {
      const sourceImage = activeHorseCard ? activeHorseCard.querySelector("img") : null;
      horseDialog.close();
      clearPortraitTransition(sourceImage);
      activeHorseCard = null;
    });
    horseDialog.addEventListener("click", (event) => {
      if (event.target === horseDialog) closeHorseDialog();
    });
    horseDialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeHorseDialog();
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

})();
