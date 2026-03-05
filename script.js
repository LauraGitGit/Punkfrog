// Enquiry button: open and close enquiry form
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

// Production: hover item → show slide-in panel with img and content; leave layout → hide panel
(function () {
  const section = document.getElementById("production-section");
  const layout = document.querySelector(".production-layout");
  const panel = document.getElementById("production-detail-panel");
  const panelImg = document.getElementById("production-panel-img");
  const panelTitle = document.getElementById("production-panel-title");
  const panelDescription = document.getElementById(
    "production-panel-description",
  );
  const panelLinkWrap = document.getElementById("production-panel-link-wrap");
  const panelLink = document.getElementById("production-panel-link");
  const items = document.querySelectorAll(".production-item");

  if (!panel || !panelTitle || !panelDescription || !layout) return;

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const img = item.querySelector("img");
      const title = item.dataset.productionTitle || "";
      const description = item.dataset.productionDescription || "";
      const linkUrl = (item.dataset.productionLink || "").trim();
      const linkLabel = (item.dataset.productionLinkLabel || "").trim();

      if (panelImg) {
        panelImg.src = img ? img.src : "";
        panelImg.alt = img ? img.alt : "";
      }
      panelTitle.textContent = title;
      panelDescription.textContent = description;

      if (linkUrl && panelLinkWrap && panelLink) {
        panelLink.href = linkUrl;
        panelLink.textContent = linkLabel ? `${linkLabel} ${linkUrl}` : linkUrl;
        panelLinkWrap.style.display = "";
      } else if (panelLinkWrap) {
        panelLinkWrap.style.display = "none";
      }

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
      isExpanded
        ? "Hide frameworks and templates table"
        : "Show frameworks and templates table",
    );
    content.setAttribute("aria-hidden", String(!isExpanded));
    if (triggerText)
      triggerText.textContent = isExpanded
        ? "Hide Frameworks & Templates"
        : "Frameworks & Templates";
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
