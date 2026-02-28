// Enquiry button: open and closeenquiry form
document.querySelectorAll(".enquiry-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = "./enquiry-form.html";
  });
});

document.getElementById("close-enquiry-form")?.addEventListener("click", () => {
  window.location.href = "./index.html";
});

// Business Consulting: hover item → show panel; leave layout → hide panel
(function () {
  const section = document.getElementById("business-consulting-section");
  const layout = document.querySelector(".business-consulting-layout");
  const panel = document.getElementById("consulting-detail-panel");
  const panelTitle = document.getElementById("consulting-panel-title");
  const panelList = document.getElementById("consulting-panel-list");
  const items = document.querySelectorAll(".consulting-item");

  if (!panel || !panelTitle || !panelList || !layout) return;

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const title = item.dataset.panelTitle || "";
      const raw = item.dataset.panelItems || "";
      const separator = raw.includes("|") ? "|" : ",";
      const entries = raw
        .split(separator)
        .map((s) => s.trim())
        .filter(Boolean);
      panelTitle.textContent = title;
      panelList.innerHTML = entries.map((text) => `<li>${text}</li>`).join("");
      panel.classList.add("is-visible");
      panel.setAttribute("aria-hidden", "false");
      if (section) section.classList.add("layout-panel-active");
    });
  });

  layout.addEventListener("mouseleave", () => {
    panel.classList.remove("is-visible");
    panel.setAttribute("aria-hidden", "true");
    if (section) section.classList.remove("layout-panel-active");
  });
})();

// Frameworks: button toggles expand/collapse of the full frameworks table
(function () {
  const wrapper = document.getElementById("frameworks-wrapper");
  const trigger = document.getElementById("frameworks-trigger");
  const content = document.getElementById("frameworks-content");
  const triggerText = document.querySelector(".frameworks-trigger-text");

  if (!wrapper || !trigger || !content) return;

  trigger.addEventListener("click", () => {
    const isExpanded = wrapper.classList.toggle("is-expanded");
    trigger.setAttribute("aria-expanded", String(isExpanded));
    trigger.setAttribute(
      "aria-label",
      isExpanded ? "Hide frameworks table" : "Show frameworks table",
    );
    content.setAttribute("aria-hidden", String(!isExpanded));
    if (triggerText)
      triggerText.textContent = isExpanded ? "Hide frameworks" : "Frameworks";
  });
})();

// Production section: popup modal
(function () {
  const overlay = document.getElementById("production-popup-overlay");
  const closeBtn = document.getElementById("production-popup-close");
  const popupImg = document.getElementById("production-popup-img");
  const popupTitle = document.getElementById("production-popup-title");
  const popupDescription = document.getElementById(
    "production-popup-description",
  );
  const popupLinkWrap = document.getElementById("production-popup-link-wrap");
  const popupLink = document.getElementById("production-popup-link");

  const cards = document.querySelectorAll(".production-content");

  function openPopup(card) {
    const img = card.querySelector("img");
    const title = card.dataset.productionTitle || "";
    const description = card.dataset.productionDescription || "";
    const linkUrl = (card.dataset.productionLink || "").trim();
    const linkLabel = (card.dataset.productionLinkLabel || "").trim();

    popupImg.src = img ? img.src : "";
    popupImg.alt = img ? img.alt : "";
    popupTitle.textContent = title;
    popupDescription.textContent = description;

    if (linkUrl && popupLinkWrap && popupLink) {
      popupLink.href = linkUrl;
      popupLink.textContent = linkLabel ? `${linkLabel} ${linkUrl}` : linkUrl;
      popupLinkWrap.style.display = "";
    } else if (popupLinkWrap) {
      popupLinkWrap.style.display = "none";
    }

    overlay.classList.add("is-visible");
    overlay.setAttribute("aria-hidden", "false");
  }

  function closePopup() {
    overlay.classList.remove("is-visible");
    overlay.setAttribute("aria-hidden", "true");
  }

  if (!overlay) return;

  cards.forEach((card) => {
    card.addEventListener("click", () => openPopup(card));
  });

  closeBtn?.addEventListener("click", closePopup);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closePopup();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-visible")) {
      closePopup();
    }
  });
})();

// Back to top: show button only after user scrolls past a certain level
(function () {
  const btn = document.getElementById("back-to-top-button");
  if (!btn) return;

  // Show button after scrolling past this many viewport heights (1 = one full screen)
  const viewportHeightsThreshold = 1;

  function updateVisibility() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const threshold = window.innerHeight * viewportHeightsThreshold;
    if (scrollY >= threshold) {
      btn.classList.add("is-visible");
      btn.setAttribute("aria-hidden", "false");
    } else {
      btn.classList.remove("is-visible");
      btn.setAttribute("aria-hidden", "true");
    }
  }

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
})();
