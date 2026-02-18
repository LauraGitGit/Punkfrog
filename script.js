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
      const entries = (item.dataset.panelItems || "")
        .split(",")
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
