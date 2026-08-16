(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.body.classList.remove("is-loading");
  document.body.classList.add("is-ready");

  document.querySelectorAll(".footer-meta [data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const header = document.querySelector("[data-header]");
  const headerScene = document.querySelector(".hero");

  if (header && headerScene && !header.classList.contains("is-solid")) {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        header.classList.toggle("is-scrolled", entry.intersectionRatio < 0.74);
      },
      { threshold: [0, 0.74, 1] }
    );
    headerObserver.observe(headerScene);
  }

  // Параллакс первого экрана по курсору. Сюда пишутся только две переменные,
  // всю глубину и сглаживание раскладывает CSS. Запись раз в кадр: pointermove
  // приходит чаще, чем экран успевает перерисоваться.
  if (headerScene && !reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let pending = false;
    let mx = 0;
    let my = 0;

    const applyPointer = () => {
      pending = false;
      headerScene.style.setProperty("--mx", mx.toFixed(3));
      headerScene.style.setProperty("--my", my.toFixed(3));
    };

    const queuePointer = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(applyPointer);
    };

    headerScene.addEventListener(
      "pointermove",
      (event) => {
        const box = headerScene.getBoundingClientRect();
        mx = (event.clientX - box.left) / box.width * 2 - 1;
        my = (event.clientY - box.top) / box.height * 2 - 1;
        queuePointer();
      },
      { passive: true }
    );

    headerScene.addEventListener("pointerleave", () => {
      mx = 0;
      my = 0;
      queuePointer();
    });
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

    mobileMenu.querySelectorAll("a").forEach((link, index) => {
      link.style.setProperty("--i", String(index));
      link.addEventListener("click", closeMenu);
    });
  }

  // Цитата разрыва набирается по словам: фраза про ожидание, поэтому
  // одним кадром её показывать нельзя. Режем только по обычным пробелам -
  // неразрывные держат типографику и остаются внутри слова.
  const breakQuote = document.querySelector(".break-quote");
  if (breakQuote) {
    const words = breakQuote.textContent.split(" ");
    breakQuote.textContent = "";
    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.className = "quote-word";
      span.style.setProperty("--i", String(index));
      span.textContent = word;
      breakQuote.append(span);
      if (index < words.length - 1) breakQuote.append(" ");
    });
    breakQuote.classList.add("is-typeset");
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
      const wrapper = image.closest(
        ".horse-image-wrap, .dialog-image-wrap, figure, .hero-media, .break-media"
      );
      if (wrapper) wrapper.classList.add("image-error");
    });
  });

  const horseDialog = document.querySelector("#horse-dialog");
  if (horseDialog) {
    const dialogTitle = horseDialog.querySelector("[data-dialog-title]");
    const dialogDetails = horseDialog.querySelector("[data-dialog-details]");
    const dialogStatus = horseDialog.querySelector("[data-dialog-status]");
    const dialogImage = horseDialog.querySelector("[data-dialog-image]");
    const dialogSpecs = horseDialog.querySelector("[data-dialog-specs]");
    const dialogClose = horseDialog.querySelector(".dialog-close");
    const dialogContact = horseDialog.querySelector("[data-dialog-contact]");
    const dialogImageWrap = dialogImage.closest(".dialog-image-wrap");
    let activeHorseCard = null;

    // Окно открывается сразу, кадр догружается отдельно. Пока кадра нет,
    // плашка .image-error работает как состояние загрузки.
    const clearFrameLoading = () => dialogImageWrap.classList.remove("is-frame-loading");
    dialogImage.addEventListener("load", clearFrameLoading);
    dialogImage.addEventListener("error", clearFrameLoading);

    // Досье собирается из data-атрибутов карточки. Пустые поля
    // не выводятся, чтобы в модалке не оставалось пустых строк.
    const specFields = [
      ["breed", "Порода и пол"],
      ["born", "Год рождения"],
      ["color", "Масть"],
      ["height", "Рост в холке"],
      ["origin", "Происхождение"],
      ["place", "Местонахождение"]
    ];

    const renderSpecs = (card) => {
      dialogSpecs.textContent = "";
      specFields.forEach(([key, label]) => {
        const value = card.dataset[key];
        if (!value) return;
        const row = document.createElement("div");
        const dt = document.createElement("dt");
        const dd = document.createElement("dd");
        dt.textContent = label;
        dd.textContent = value;
        row.append(dt, dd);
        dialogSpecs.append(row);
      });
    };

    const closeHorseDialog = () => {
      if (!horseDialog.open) return;
      horseDialog.close();
      document.body.classList.remove("dialog-open");
      activeHorseCard?.focus({ preventScroll: true });
      activeHorseCard = null;
    };

    document.querySelectorAll("button.horse-card[data-name]").forEach((card) => {
      card.addEventListener("click", () => {
        const sourceImage = card.querySelector("img");
        activeHorseCard = card;
        dialogTitle.textContent = card.dataset.name || "Лошадь Yeguada MS";
        dialogDetails.textContent = card.dataset.details || "Данные уточняются.";
        dialogStatus.textContent = card.dataset.status || "";
        renderSpecs(card);
        dialogImage.src = sourceImage ? sourceImage.currentSrc || sourceImage.src : "";
        dialogImage.alt = sourceImage ? sourceImage.alt : "";
        dialogImageWrap.classList.remove("image-error");
        dialogImageWrap.classList.toggle("is-frame-loading", !dialogImage.complete);

        document.body.classList.add("dialog-open");
        horseDialog.showModal();
      });
    });

    dialogClose.addEventListener("click", closeHorseDialog);
    dialogContact.addEventListener("click", () => {
      horseDialog.close();
      document.body.classList.remove("dialog-open");
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
