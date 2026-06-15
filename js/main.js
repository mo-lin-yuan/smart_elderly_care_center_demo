(() => {
  "use strict";
  const config = window.ASSET_CONFIG;
  if (!config) {
    console.error("ASSET_CONFIG 未加载。");
    return;
  }

  document.querySelectorAll("[data-asset]").forEach((image) => {
    const key = image.dataset.asset;
    const src = config.images[key];
    if (src) image.src = src;
    image.addEventListener("error", () => {
      if (image.src.endsWith(config.placeholderImage)) return;
      image.src = config.placeholderImage;
    }, { once: true });
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const closeMenu = () => {
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "打开导航菜单");
  };
  const toggleMenu = () => {
    const open = !navLinks?.classList.contains("open");
    navLinks?.classList.toggle("open", open);
    menuToggle?.setAttribute("aria-expanded", String(open));
    menuToggle?.setAttribute("aria-label", open ? "关闭导航菜单" : "打开导航菜单");
  };
  menuToggle?.addEventListener("click", toggleMenu);
  document.addEventListener("click", (event) => {
    if (!navLinks?.classList.contains("open")) return;
    if (navLinks.contains(event.target) || menuToggle?.contains(event.target)) return;
    closeMenu();
  });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
  window.SiteMenu = Object.freeze({ close: closeMenu, toggle: toggleMenu });

  document.querySelectorAll(".image-button, .detail-image-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const key = trigger.dataset.imageKey;
      window.ImageViewer?.open({
        src: config.images[key] || config.placeholderImage,
        title: trigger.dataset.imageTitle || "高清图片预览"
      });
    });
  });

  document.querySelectorAll(".video-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = config.videos[trigger.dataset.videoKey];
      window.VideoModal?.open(item);
    });
  });
})();
