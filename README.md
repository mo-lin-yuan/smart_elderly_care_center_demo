# 《银龄卫士》作品在线展示页面

本项目是“中国高校计算机大赛—网络技术挑战赛”作品《银龄卫士——面向智慧养老院的端边云协同多机器人网络系统》的静态在线展示页面。

网站使用 HTML、CSS、JavaScript，无后端、无数据库，可部署到 GitHub Pages、Cloudflare Pages、Vercel 或普通静态服务器。

## 当前功能

- 8 个全屏分页：首页、项目概览、系统架构、核心技术、学术成果、闭环演示、多端协同、团队介绍；
- 桌面端支持顶部导航、左右箭头、分页圆点、键盘方向键和鼠标滚轮切页；
- 手机端支持导航菜单与左右滑动切页；
- 只使用 1 个完整演示视频；
- 多端协同页面支持机器人端、网页监控中心、护工移动端标签切换；
- 高清图片查看器支持滚轮缩放、拖拽、双击缩放和移动端双指缩放；
- 首页主视觉中的机器人图标与系统定位文字为正式前景元素，不再依赖背景图，也不包含素材替换说明等内部提示。

## 项目目录

```text
silver-age-guardian-demo/
├── index.html
├── css/
│   ├── style.css
│   └── viewer.css
├── js/
│   ├── assets-config.js
│   ├── page-controller.js
│   ├── image-viewer.js
│   ├── video-modal.js
│   ├── terminal-tabs.js
│   └── main.js
├── assets/
│   ├── images/
│   ├── videos/
│   └── placeholders/
└── README.md
```

## 唯一视频文件

```text
assets/videos/full-demo.mp4
```

建议使用 MP4 封装、H.264 视频编码和 AAC 音频编码，并开启 faststart 以便在线播放。

## 主要图片文件

```text
assets/images/hero-cover.webp
assets/images/project-overview.webp
assets/images/system-architecture.webp
assets/images/key-technology-architecture.webp
assets/images/scheduling-fault-tolerance.webp
assets/images/closed-loop-scenarios.webp
assets/images/terminal-robot.webp
assets/images/terminal-web.webp
assets/images/terminal-mobile.webp
assets/images/video-covers/full-demo-cover.webp
```

只要路径和文件名保持一致，直接覆盖同名素材即可，无须修改 HTML、CSS 或 JavaScript。

## 本地预览

在项目根目录打开终端：

```bash
python -m http.server 8000
```

浏览器访问：

```text
http://localhost:8000
```

## 图片查看器

电脑端支持：

- 鼠标滚轮缩放；
- 以鼠标位置为中心缩放；
- 按住鼠标左键拖动；
- 双击放大或恢复；
- Esc 关闭。

手机端支持双指捏合、单指拖动和双击缩放。

## 部署前检查

- 检查页面、图片、视频、文件名和元数据中是否包含姓名、手机号、学校、学院、地区等敏感信息；
- 检查视频能否播放、拖动进度和全屏；
- 检查所有图片能否打开高清查看器；
- 使用电脑和手机分别测试；
- 建议浏览器缩放比例保持 100%。
