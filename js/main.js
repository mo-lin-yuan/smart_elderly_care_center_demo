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

(() => {
  "use strict";
  const heroVisual = document.querySelector(".hero-visual");
  const heroDiagram = document.querySelector(".hero-diagram");
  const heroSystemCard = document.querySelector(".hero-system-card");
  const nodes = Array.from(document.querySelectorAll(".hero-diagram .node"));
  if (!heroVisual || !heroDiagram || !heroSystemCard || !nodes.length) return;

  const interactiveTargets = [heroVisual, heroDiagram, heroSystemCard, ...nodes];
  const defaultPoint = { x: "58%", y: "34%" };
  let autoCycleTimer = null;
  let interacting = false;
  let activeIndex = Math.max(0, nodes.findIndex((node) => node.classList.contains("is-active")));

  const setPointer = (element, x, y) => {
    element.style.setProperty("--pointer-x", x);
    element.style.setProperty("--pointer-y", y);
  };

  const resetPointer = () => {
    interactiveTargets.forEach((element) => {
      setPointer(element, defaultPoint.x, defaultPoint.y);
    });
    heroSystemCard.style.setProperty("--tilt-x", "0deg");
    heroSystemCard.style.setProperty("--tilt-y", "0deg");
  };

  const updatePointer = (event) => {
    const rect = heroVisual.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const ratioX = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    const ratioY = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
    const x = `${(ratioX * 100).toFixed(2)}%`;
    const y = `${(ratioY * 100).toFixed(2)}%`;
    interactiveTargets.forEach((element) => setPointer(element, x, y));
    heroSystemCard.style.setProperty("--tilt-y", `${((ratioX - 0.5) * 8).toFixed(2)}deg`);
    heroSystemCard.style.setProperty("--tilt-x", `${((0.5 - ratioY) * 6).toFixed(2)}deg`);
  };

  const setActiveNode = (index) => {
    activeIndex = (index + nodes.length) % nodes.length;
    nodes.forEach((node, nodeIndex) => {
      node.classList.toggle("is-active", nodeIndex === activeIndex);
    });
  };

  const startAutoCycle = () => {
    clearInterval(autoCycleTimer);
    autoCycleTimer = window.setInterval(() => {
      if (interacting) return;
      setActiveNode(activeIndex + 1);
    }, 2600);
  };

  nodes.forEach((node, index) => {
    const activate = () => {
      interacting = true;
      setActiveNode(index);
    };
    const deactivate = () => {
      interacting = false;
    };
    node.addEventListener("mouseenter", activate);
    node.addEventListener("focus", activate);
    node.addEventListener("mouseleave", deactivate);
    node.addEventListener("blur", deactivate);
  });

  heroVisual.addEventListener("pointermove", (event) => {
    interacting = true;
    updatePointer(event);
  });
  heroVisual.addEventListener("pointerleave", () => {
    interacting = false;
    resetPointer();
  });
  heroVisual.addEventListener("mouseenter", () => {
    interacting = true;
  });

  resetPointer();
  setActiveNode(activeIndex);
  startAutoCycle();
})();
