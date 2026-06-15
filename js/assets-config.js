window.ASSET_CONFIG = Object.freeze({
  placeholderImage: "assets/placeholders/image-placeholder.svg",
  images: Object.freeze({
    hero: "assets/images/hero-cover.webp",
    projectOverview: "assets/images/project-overview.webp",
    systemArchitecture: "assets/images/system-architecture.webp",
    keyTechnology: "assets/images/key-technology-architecture.webp",
    schedulingFaultTolerance: "assets/images/scheduling-fault-tolerance.webp",
    closedLoopScenarios: "assets/images/closed-loop-scenarios.webp",
    terminalRobot: "assets/images/terminal-robot.webp",
    terminalWeb: "assets/images/terminal-web.webp",
    terminalMobile: "assets/images/terminal-mobile.webp",
    fullDemoCover: "assets/images/video-covers/full-demo-cover.webp"
  }),
  videos: Object.freeze({
    fullDemo: Object.freeze({
      src: "assets/videos/full-demo.mp4",
      poster: "assets/images/video-covers/full-demo-cover.webp",
      title: "“感知—决策—执行”全流程演示",
      description: "完整展示多机器人巡检、异常识别、联动告警、任务调度、网页监控中心与护工移动端协同运行过程。"
    })
  })
});
