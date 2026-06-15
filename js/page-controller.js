(() => {
  "use strict";

  const pages = Array.from(document.querySelectorAll(".page"));
  const prevButton = document.getElementById("page-prev");
  const nextButton = document.getElementById("page-next");
  const pageLabel = document.getElementById("page-label");
  const pageCurrent = document.getElementById("page-current");
  const pageTotal = document.getElementById("page-total");
  const pageDots = document.getElementById("page-dots");
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const pageIndexById = new Map(pages.map((page, index) => [page.id, index]));
  let currentIndex = 0;
  let wheelLocked = false;
  let touchStartX = 0;
  let touchStartY = 0;

  const twoDigits = (value) => String(value).padStart(2, "0");
  const mediaOpen = () => document.body.classList.contains("viewer-open") || document.body.classList.contains("modal-open");

  const updateController = () => {
    const active = pages[currentIndex];
    if (pageLabel) pageLabel.textContent = active?.dataset.pageTitle || "作品展示";
    if (pageCurrent) pageCurrent.textContent = twoDigits(currentIndex + 1);
    if (pageTotal) pageTotal.textContent = twoDigits(pages.length);
    if (prevButton) prevButton.disabled = currentIndex === 0;
    if (nextButton) nextButton.disabled = currentIndex === pages.length - 1;

    pageDots?.querySelectorAll(".page-dot").forEach((dot, index) => {
      const selected = index === currentIndex;
      dot.classList.toggle("active", selected);
      dot.setAttribute("aria-current", selected ? "page" : "false");
    });

    navLinks.forEach((link) => {
      const selected = link.getAttribute("href") === `#${active?.id}`;
      link.classList.toggle("active", selected);
      if (selected) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };

  const setPageState = (page, index) => {
    const active = index === currentIndex;
    page.classList.toggle("active", active);
    page.classList.toggle("before", index < currentIndex);
    page.classList.toggle("after", index > currentIndex);
    page.setAttribute("aria-hidden", String(!active));
    if ("inert" in page) page.inert = !active;
    if (active) page.scrollTop = 0;
  };

  const navigateTo = (target, options = {}) => {
    const { updateHash = true, focusPage = false } = options;
    const index = typeof target === "number" ? target : pageIndexById.get(target);
    if (!Number.isInteger(index) || index < 0 || index >= pages.length || index === currentIndex && pages[index].classList.contains("active")) {
      updateController();
      return;
    }
    currentIndex = index;
    pages.forEach(setPageState);
    updateController();
    window.SiteMenu?.close?.();

    const active = pages[currentIndex];
    document.title = `${active?.dataset.pageTitle || "作品展示"}｜银龄卫士`;
    if (updateHash && active?.id && location.hash !== `#${active.id}`) {
      history.pushState({ page: active.id }, "", `#${active.id}`);
    }
    if (focusPage) active?.focus({ preventScroll: true });
  };

  pages.forEach((page) => { page.tabIndex = -1; });
  pageDots?.replaceChildren(...pages.map((page, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "page-dot";
    dot.setAttribute("aria-label", `前往第${index + 1}页：${page.dataset.pageTitle || "内容"}`);
    dot.addEventListener("click", () => navigateTo(index));
    return dot;
  }));

  const initialId = location.hash.slice(1);
  currentIndex = pageIndexById.has(initialId) ? pageIndexById.get(initialId) : 0;
  pages.forEach(setPageState);
  updateController();

  prevButton?.addEventListener("click", () => navigateTo(currentIndex - 1));
  nextButton?.addEventListener("click", () => navigateTo(currentIndex + 1));

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href")?.slice(1);
      if (!pageIndexById.has(id)) return;
      event.preventDefault();
      navigateTo(id);
    });
  });

  addEventListener("popstate", () => {
    const id = location.hash.slice(1);
    navigateTo(pageIndexById.has(id) ? id : 0, { updateHash: false });
  });

  document.addEventListener("keydown", (event) => {
    if (mediaOpen()) return;
    const target = event.target;
    const interactive = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLButtonElement || target instanceof HTMLAnchorElement || target instanceof HTMLVideoElement || target?.isContentEditable;
    if (interactive) return;
    if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
      event.preventDefault(); navigateTo(currentIndex + 1);
    } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
      event.preventDefault(); navigateTo(currentIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault(); navigateTo(0);
    } else if (event.key === "End") {
      event.preventDefault(); navigateTo(pages.length - 1);
    }
  });

  addEventListener("wheel", (event) => {
    if (innerWidth <= 900 || mediaOpen() || wheelLocked || Math.abs(event.deltaY) < 30) return;
    event.preventDefault();
    wheelLocked = true;
    navigateTo(currentIndex + (event.deltaY > 0 ? 1 : -1));
    setTimeout(() => { wheelLocked = false; }, 650);
  }, { passive: false });

  document.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1 || mediaOpen()) return;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  }, { passive: true });

  document.addEventListener("touchend", (event) => {
    if (!event.changedTouches.length || mediaOpen()) return;
    const dx = event.changedTouches[0].clientX - touchStartX;
    const dy = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < 65 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
    navigateTo(currentIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });

  window.PageController = Object.freeze({ navigateTo, getCurrentIndex: () => currentIndex });
})();
