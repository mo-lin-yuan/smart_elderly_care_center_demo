(() => {
  "use strict";

  const viewer = document.getElementById("image-viewer");
  const viewport = document.getElementById("viewer-viewport");
  const image = document.getElementById("viewer-image");
  const title = document.getElementById("viewer-title");
  const scaleOutput = document.getElementById("viewer-scale");
  if (!viewer || !viewport || !image) return;

  const state = {
    scale: 1, fitScale: 1, minScale: .2, maxScale: 5,
    x: 0, y: 0, naturalWidth: 0, naturalHeight: 0,
    pointers: new Map(), dragStart: null, pinchStart: null,
    lastFocused: null
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const updateOutput = () => { if (scaleOutput) scaleOutput.value = `${Math.round(state.scale * 100)}%`; };
  const render = () => {
    image.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${state.scale})`;
    updateOutput();
  };

  const constrain = () => {
    const rect = viewport.getBoundingClientRect();
    const width = state.naturalWidth * state.scale;
    const height = state.naturalHeight * state.scale;
    const margin = 80;
    if (width <= rect.width) state.x = (rect.width - width) / 2;
    else state.x = clamp(state.x, rect.width - width - margin, margin);
    if (height <= rect.height) state.y = (rect.height - height) / 2;
    else state.y = clamp(state.y, rect.height - height - margin, margin);
  };

  const setScaleAt = (nextScale, clientX, clientY) => {
    const rect = viewport.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const oldScale = state.scale;
    const imageX = (px - state.x) / oldScale;
    const imageY = (py - state.y) / oldScale;
    state.scale = clamp(nextScale, state.minScale, state.maxScale);
    state.x = px - imageX * state.scale;
    state.y = py - imageY * state.scale;
    constrain(); render();
  };

  const centerPoint = () => {
    const rect = viewport.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  };

  const fit = () => {
    if (!state.naturalWidth || !state.naturalHeight) return;
    const rect = viewport.getBoundingClientRect();
    state.fitScale = Math.min((rect.width - 32) / state.naturalWidth, (rect.height - 32) / state.naturalHeight, 1);
    state.minScale = Math.min(.5, state.fitScale);
    state.scale = state.fitScale;
    state.x = (rect.width - state.naturalWidth * state.scale) / 2;
    state.y = (rect.height - state.naturalHeight * state.scale) / 2;
    render();
  };

  const actual = () => {
    const rect = viewport.getBoundingClientRect();
    state.scale = 1;
    state.x = (rect.width - state.naturalWidth) / 2;
    state.y = (rect.height - state.naturalHeight) / 2;
    constrain(); render();
  };

  const open = ({ src, title: imageTitle = "图片预览" }) => {
    if (!src) return;
    state.lastFocused = document.activeElement;
    if (title) title.textContent = imageTitle;
    image.alt = imageTitle;
    image.onload = () => {
      state.naturalWidth = image.naturalWidth;
      state.naturalHeight = image.naturalHeight;
      fit();
    };
    image.onerror = () => {
      image.src = window.ASSET_CONFIG?.placeholderImage || "assets/placeholders/image-placeholder.svg";
    };
    image.src = src;
    viewer.classList.add("open");
    viewer.setAttribute("aria-hidden", "false");
    document.body.classList.add("viewer-open");
    viewport.focus({ preventScroll: true });
  };

  const close = () => {
    if (!viewer.classList.contains("open")) return;
    viewer.classList.remove("open");
    viewer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("viewer-open");
    state.pointers.clear();
    state.lastFocused?.focus?.();
  };

  viewer.querySelectorAll("[data-close-viewer]").forEach((el) => el.addEventListener("click", close));

  viewer.querySelectorAll("[data-viewer-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.viewerAction;
      const center = centerPoint();
      if (action === "zoom-in") setScaleAt(state.scale * 1.22, center.x, center.y);
      else if (action === "zoom-out") setScaleAt(state.scale / 1.22, center.x, center.y);
      else if (action === "fit" || action === "reset") fit();
      else if (action === "actual") actual();
      viewport.classList.add("interacted");
    });
  });

  viewport.addEventListener("wheel", (event) => {
    event.preventDefault();
    const factor = Math.exp(-event.deltaY * .0015);
    setScaleAt(state.scale * factor, event.clientX, event.clientY);
    viewport.classList.add("interacted");
  }, { passive: false });

  viewport.addEventListener("dblclick", (event) => {
    event.preventDefault();
    if (state.scale > Math.max(1.05, state.fitScale * 1.8)) fit();
    else setScaleAt(Math.max(1.5, state.fitScale * 2.4), event.clientX, event.clientY);
    viewport.classList.add("interacted");
  });

  const pointerDistance = () => {
    const values = Array.from(state.pointers.values());
    return Math.hypot(values[0].x - values[1].x, values[0].y - values[1].y);
  };
  const pointerCenter = () => {
    const values = Array.from(state.pointers.values());
    return { x: (values[0].x + values[1].x) / 2, y: (values[0].y + values[1].y) / 2 };
  };

  viewport.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    viewport.setPointerCapture?.(event.pointerId);
    state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    viewport.classList.add("dragging", "interacted");
    if (state.pointers.size === 1) {
      state.dragStart = { pointerX: event.clientX, pointerY: event.clientY, x: state.x, y: state.y };
      state.pinchStart = null;
    } else if (state.pointers.size === 2) {
      const center = pointerCenter();
      const rect = viewport.getBoundingClientRect();
      state.pinchStart = {
        distance: pointerDistance(), scale: state.scale,
        imageX: (center.x - rect.left - state.x) / state.scale,
        imageY: (center.y - rect.top - state.y) / state.scale
      };
    }
  });

  viewport.addEventListener("pointermove", (event) => {
    if (!state.pointers.has(event.pointerId)) return;
    event.preventDefault();
    state.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (state.pointers.size === 1 && state.dragStart) {
      state.x = state.dragStart.x + event.clientX - state.dragStart.pointerX;
      state.y = state.dragStart.y + event.clientY - state.dragStart.pointerY;
      constrain(); render();
    } else if (state.pointers.size === 2 && state.pinchStart) {
      const rect = viewport.getBoundingClientRect();
      const center = pointerCenter();
      const ratio = pointerDistance() / Math.max(1, state.pinchStart.distance);
      state.scale = clamp(state.pinchStart.scale * ratio, state.minScale, state.maxScale);
      state.x = center.x - rect.left - state.pinchStart.imageX * state.scale;
      state.y = center.y - rect.top - state.pinchStart.imageY * state.scale;
      constrain(); render();
    }
  });

  const releasePointer = (event) => {
    state.pointers.delete(event.pointerId);
    if (state.pointers.size === 1) {
      const remaining = Array.from(state.pointers.values())[0];
      state.dragStart = { pointerX: remaining.x, pointerY: remaining.y, x: state.x, y: state.y };
      state.pinchStart = null;
    } else if (state.pointers.size === 0) {
      state.dragStart = null; state.pinchStart = null;
      viewport.classList.remove("dragging");
    }
  };
  viewport.addEventListener("pointerup", releasePointer);
  viewport.addEventListener("pointercancel", releasePointer);

  viewport.addEventListener("keydown", (event) => {
    const center = centerPoint();
    if (["+", "="].includes(event.key)) { event.preventDefault(); setScaleAt(state.scale * 1.2, center.x, center.y); }
    else if (event.key === "-") { event.preventDefault(); setScaleAt(state.scale / 1.2, center.x, center.y); }
    else if (event.key === "0") { event.preventDefault(); actual(); }
    else if (event.key.toLowerCase() === "f") { event.preventDefault(); fit(); }
    else if (event.key === "ArrowLeft") { event.preventDefault(); state.x += 40; constrain(); render(); }
    else if (event.key === "ArrowRight") { event.preventDefault(); state.x -= 40; constrain(); render(); }
    else if (event.key === "ArrowUp") { event.preventDefault(); state.y += 40; constrain(); render(); }
    else if (event.key === "ArrowDown") { event.preventDefault(); state.y -= 40; constrain(); render(); }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && viewer.classList.contains("open")) close();
  });
  addEventListener("resize", () => { if (viewer.classList.contains("open")) fit(); });

  window.ImageViewer = Object.freeze({ open, close, fit });
})();
