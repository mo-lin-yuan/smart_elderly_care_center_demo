(() => {
  "use strict";

  const modal = document.getElementById("video-modal");
  const stage = document.getElementById("video-stage");
  const video = document.getElementById("modal-video");
  const title = document.getElementById("video-title");
  const description = document.getElementById("video-description");
  const message = document.getElementById("video-message");
  const loading = document.getElementById("video-loading");
  const fullscreenButton = document.getElementById("video-fullscreen");

  if (!modal || !stage || !video) return;

  let lastFocused = null;
  let loadToken = 0;
  let closing = false;

  const setLoading = (visible) => {
    if (loading) loading.hidden = !visible;
  };

  const setMessage = (visible, text = "") => {
    if (!message) return;
    if (text) message.textContent = text;
    message.hidden = !visible;
  };

  const requestFullscreen = async () => {
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        return;
      }
      if (stage.requestFullscreen) await stage.requestFullscreen();
      else if (stage.webkitRequestFullscreen) stage.webkitRequestFullscreen();
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
    } catch (error) {
      console.warn("无法进入全屏模式：", error);
    }
  };

  const updateFullscreenLabel = () => {
    if (!fullscreenButton) return;
    const active = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
    fullscreenButton.firstChild.textContent = active ? "退出全屏 " : "全屏播放 ";
    fullscreenButton.setAttribute("aria-label", active ? "退出全屏" : "全屏播放");
  };

  const open = (item) => {
    if (!item?.src) return;

    loadToken += 1;
    const token = loadToken;
    closing = false;
    lastFocused = document.activeElement;

    if (title) title.textContent = item.title || "完整系统演示";
    if (description) description.textContent = item.description || "";

    setMessage(false);
    setLoading(true);
    video.hidden = false;
    video.poster = item.poster ? new URL(item.poster, document.baseURI).href : "";
    video.src = new URL(item.src, document.baseURI).href;
    video.currentTime = 0;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-close")?.focus();

    const ready = () => {
      if (token !== loadToken || closing) return;
      setLoading(false);
      setMessage(false);
    };

    video.addEventListener("loadedmetadata", ready, { once: true });
    video.addEventListener("canplay", ready, { once: true });
    video.load();
  };

  const close = async () => {
    if (!modal.classList.contains("open")) return;
    closing = true;
    loadToken += 1;

    try {
      if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
      else if (document.webkitFullscreenElement && document.webkitExitFullscreen) document.webkitExitFullscreen();
    } catch { /* no-op */ }

    video.pause();
    video.removeAttribute("src");
    video.removeAttribute("poster");
    video.load();
    setLoading(false);
    setMessage(false);

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lastFocused?.focus?.();
    window.setTimeout(() => { closing = false; }, 0);
  };

  video.addEventListener("loadedmetadata", () => setLoading(false));
  video.addEventListener("canplay", () => setLoading(false));
  video.addEventListener("playing", () => { setLoading(false); setMessage(false); });
  video.addEventListener("waiting", () => {
    if (!video.paused && modal.classList.contains("open")) setLoading(true);
  });
  video.addEventListener("error", () => {
    if (closing || !modal.classList.contains("open") || !video.getAttribute("src")) return;
    setLoading(false);
    video.hidden = true;
    setMessage(true, "视频暂时无法加载，请确认视频文件完整，并使用最新版浏览器访问。");
  });

  fullscreenButton?.addEventListener("click", requestFullscreen);
  document.addEventListener("fullscreenchange", updateFullscreenLabel);
  document.addEventListener("webkitfullscreenchange", updateFullscreenLabel);
  modal.querySelectorAll("[data-close-video]").forEach((element) => element.addEventListener("click", close));

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("open")) return;
    if (event.key === "Escape") close();
    if (event.key.toLowerCase() === "f") requestFullscreen();
  });

  window.VideoModal = Object.freeze({ open, close });
})();
