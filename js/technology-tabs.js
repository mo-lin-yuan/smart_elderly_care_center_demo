(() => {
  "use strict";
  const config = window.ASSET_CONFIG;
  const tabs = Array.from(document.querySelectorAll(".technology-tab"));
  const kicker = document.getElementById("technology-kicker");
  const title = document.getElementById("technology-title");
  const description = document.getElementById("technology-description");
  const points = document.getElementById("technology-points");
  const result = document.getElementById("technology-result");
  const frameworkButton = document.getElementById("technology-framework-button");
  const effectButton = document.getElementById("technology-effect-button");
  const frameworkImage = document.getElementById("technology-framework-image");
  const effectImage = document.getElementById("technology-effect-image");
  const frameworkCaption = document.getElementById("technology-framework-caption");
  const effectCaption = document.getElementById("technology-effect-caption");
  if (!config || !tabs.length || !frameworkButton || !effectButton || !frameworkImage || !effectImage) return;

  const data = Object.freeze({
    localization: Object.freeze({
      kicker: "技术一 · 可靠定位",
      title: "UWB弱全局约束多模态后端因子图优化",
      description: "将UWB作为稀疏、低频的全局尺度参考，与里程计、IMU等局部连续观测统一建模，并将模态可靠性作为图内显式状态变量联合优化。",
      points: ["构建“局部连续—全局校正”的稳定定位机制", "在线诊断UWB测距异常与里程计累计漂移", "实现轨迹状态与可靠性状态一体化求解"],
      result: "正常遮蔽及多模态退化条件下保持轨迹收敛与定位稳定。",
      frameworkKey: "techLocalizationFramework",
      frameworkTitle: "弱全局约束的多模态后端因子图优化流程",
      frameworkCaption: "弱全局约束的多模态后端因子图优化流程",
      effectKey: "techLocalizationEffect",
      effectTitle: "三类退化场景下双机器人轨迹估计结果对比",
      effectCaption: "三类退化场景下双机器人轨迹估计结果对比"
    }),
    behavior: Object.freeze({
      kicker: "技术二 · 风险预警",
      title: "双头时序网络异常行为感知与风险预测",
      description: "以人体骨架序列为核心输入，融合时空与速度特征，通过Bi-LSTM与时间注意力同时完成当前行为识别和短时风险预测。",
      points: ["归一化骨架坐标并构建时空速度联合特征", "双向时序编码聚合关键时间片段", "分类头与预测头协同输出识别和预警结果"],
      result: "实现由“事后识别”向“事前预警”的能力提升。",
      frameworkKey: "techBehaviorFramework",
      frameworkTitle: "双头时序网络异常行为识别与风险预测框架",
      frameworkCaption: "双头时序网络异常行为识别与风险预测框架",
      effectKey: "techBehaviorEffect",
      effectTitle: "典型跌倒场景下的异常识别与短时风险预测效果图",
      effectCaption: "典型跌倒场景下的异常识别与短时风险预测效果图"
    }),
    scheduling: Object.freeze({
      kicker: "技术三 · 协同决策",
      title: "面向动态任务插入的异构多机器人协同调度",
      description: "围绕常态巡护、异常触发、任务分配、空洞补位与恢复巡护，综合能力匹配、优先级、时效、电量和负载进行动态决策。",
      points: ["基于异构能力权重划分常态巡护责任区", "突发事件触发后竞价选择最优响应机器人", "局部二次竞价修补覆盖空洞并恢复巡护"],
      result: "在快速响应突发任务的同时维持巡护覆盖连续性。",
      frameworkKey: "techSchedulingFramework",
      frameworkTitle: "面向动态任务插入的异构多机器人协同调度框架",
      frameworkCaption: "面向动态任务插入的异构多机器人协同调度框架",
      effectKey: "techSchedulingEffect",
      effectTitle: "多机器人动态任务调度与覆盖恢复过程图",
      effectCaption: "多机器人动态任务调度与覆盖恢复过程图"
    }),
    execution: Object.freeze({
      kicker: "技术四 · 安全执行",
      title: "强化学习驱动执行与自适应避障机制",
      description: "将局部运动决策建模为连续动作空间下的强化学习问题，并结合课程学习、奖励函数与在线安全投影实现动态环境中的稳定执行。",
      points: ["融合本体状态、目标信息与动态障碍观测", "通过SAC策略联合输出线速度与角速度", "在线安全约束修正动作并保障稳定到点"],
      result: "兼顾任务推进、避障安全、运动平稳和执行效率。",
      frameworkKey: "techExecutionFramework",
      frameworkTitle: "面向动态环境的强化学习驱动执行与自适应避障框架",
      frameworkCaption: "面向动态环境的强化学习驱动执行与自适应避障框架",
      effectKey: "techExecutionEffect",
      effectTitle: "双服务小车在静动态混合障碍场景中的协同避障效果图",
      effectCaption: "双服务小车在静动态混合障碍场景中的协同避障效果图"
    })
  });

  const setImage = (button, image, key, imageTitle) => {
    const src = config.images[key] || config.placeholderImage;
    button.dataset.imageKey = key;
    button.dataset.imageTitle = imageTitle;
    button.setAttribute("aria-label", `放大查看${imageTitle}`);
    image.src = src;
    image.alt = imageTitle;
  };

  const select = (key, focus = false) => {
    const item = data[key];
    if (!item) return;
    tabs.forEach((tab) => {
      const active = tab.dataset.technology === key;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focus) tab.focus();
    });
    kicker.textContent = item.kicker;
    title.textContent = item.title;
    description.textContent = item.description;
    points.replaceChildren(...item.points.map((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      return li;
    }));
    result.textContent = item.result;
    setImage(frameworkButton, frameworkImage, item.frameworkKey, item.frameworkTitle);
    setImage(effectButton, effectImage, item.effectKey, item.effectTitle);
    if (frameworkCaption) frameworkCaption.textContent = item.frameworkCaption || item.frameworkTitle;
    if (effectCaption) effectCaption.textContent = item.effectCaption || item.effectTitle;
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => select(tab.dataset.technology));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      select(tabs[next].dataset.technology, true);
    });
  });

  select("localization");
  window.TechnologyTabs = Object.freeze({ select });
})();
