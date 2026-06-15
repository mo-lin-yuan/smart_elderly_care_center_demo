(() => {
  "use strict";
  const config = window.ASSET_CONFIG;
  const tabs = Array.from(document.querySelectorAll(".terminal-tab"));
  const image = document.getElementById("terminal-image");
  const imageButton = document.querySelector(".terminal-image-button");
  const kicker = document.getElementById("terminal-kicker");
  const title = document.getElementById("terminal-title");
  const text = document.getElementById("terminal-text");
  const points = document.getElementById("terminal-points");
  if (!tabs.length || !image || !imageButton) return;

  const data = {
    robot: {
      imageKey: "terminalRobot", imageTitle: "机器人端：异构机器人硬件形态与角色分工",
      kicker: "ROBOT TERMINAL", title: "机器人端",
      text: "看护机器人偏向近人服务与异常安抚，巡检机器人偏向环境感知与风险发现，二者在云端统一调度下形成能力互补。",
      points: ["看护／呼叫机器人", "巡检机器人", "现场感知与任务执行", "状态反馈与异常上报"]
    },
    web: {
      imageKey: "terminalWeb", imageTitle: "网页监控中心功能展示",
      kicker: "WEB MONITORING CENTER", title: "网页监控中心",
      text: "网页端集中展示系统主界面、异常报警、实时监控、数据统计分析、设备状态监测以及老人事项与满意度。",
      points: ["全局状态与告警汇聚", "实时监控与设备状态", "任务管理与数据分析", "可视化监管入口"]
    },
    mobile: {
      imageKey: "terminalMobile", imageTitle: "护工移动端功能展示",
      kicker: "CAREGIVER MOBILE TERMINAL", title: "护工移动端",
      text: "移动端支持活动日志记录、智能告警、应急联动、待办处理与处置结果反馈。",
      points: ["活动日志记录", "告警与应急联动", "待办与报警闭环处理", "处置结果反馈"]
    }
  };

  const select = (key) => {
    const item = data[key];
    if (!item) return;
    tabs.forEach((tab) => {
      const active = tab.dataset.terminal === key;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    image.src = config.images[item.imageKey];
    image.alt = item.imageTitle;
    imageButton.dataset.imageKey = item.imageKey;
    imageButton.dataset.imageTitle = item.imageTitle;
    imageButton.setAttribute("aria-label", `放大查看${item.title}展示图`);
    if (kicker) kicker.textContent = item.kicker;
    if (title) title.textContent = item.title;
    if (text) text.textContent = item.text;
    if (points) points.replaceChildren(...item.points.map((point) => {
      const li = document.createElement("li"); li.textContent = point; return li;
    }));
  };

  tabs.forEach((tab) => tab.addEventListener("click", () => select(tab.dataset.terminal)));
  window.TerminalTabs = Object.freeze({ select });
})();
