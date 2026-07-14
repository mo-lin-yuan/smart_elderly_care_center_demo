# 《银龄卫士》作品在线展示页面

本项目是“中国高校计算机大赛—网络技术挑战赛”参赛作品《银龄卫士——面向智慧养老院的端边云协同多机器人网络系统》的静态在线展示网站。

网站采用 HTML、CSS 和 JavaScript 开发，不依赖后端服务与数据库，可直接部署到 GitHub Pages、Cloudflare Pages、Vercel、Netlify
或普通静态 Web 服务器。

## 一、页面内容

网站采用全屏分页展示结构，共包含 8 个页面：

1. 首页
2. 项目概览
3. 系统架构
4. 核心技术
5. 学术成果
6. 闭环演示
7. 多端协同
8. 团队介绍

整体使用深色科技风格，围绕智慧养老院中的多机器人协同感知、决策、执行与服务闭环展开。

## 二、主要功能

* 支持 8 个全屏页面之间的平滑切换；
* 支持顶部导航栏、左右翻页按钮和分页圆点；
* 桌面端支持鼠标滚轮切页；
* 支持键盘方向键、Page Up、Page Down、Home、End 和空格键操作；
* 手机端支持导航菜单和左右滑动切页；
* 核心技术页面支持 4 项技术标签切换；
* 每项核心技术分别展示技术说明、框架图和效果图；
* 多端协同页面支持机器人端、网页监控中心和护工移动端切换；
* 支持完整系统演示视频播放、进度调节和全屏播放；
* 支持图片高清查看、滚轮缩放、按钮缩放、拖拽移动和双击缩放；
* 移动端图片查看器支持双指缩放；
* 图片加载失败时自动显示占位图；
* 页面采用响应式布局，兼容电脑、平板和手机。

## 三、项目目录

```text
smart_elderly_care_center_demo/
├── index.html
├── README.md
├── css/
│   ├── style.css
│   └── viewer.css
├── js/
│   ├── assets-config.js
│   ├── page-controller.js
│   ├── image-viewer.js
│   ├── video-modal.js
│   ├── terminal-tabs.js
│   ├── technology-tabs.js
│   └── main.js
└── assets/
    ├── images/
    │   ├── video-covers/
    │   ├── hero-cover.webp
    │   ├── project-overview.webp
    │   ├── system-architecture.webp
    │   ├── closed-loop-scenarios.webp
    │   ├── section-tech-bg.webp
    │   ├── terminal-robot.webp
    │   ├── terminal-web.webp
    │   ├── terminal-mobile.webp
    │   ├── tech-localization-framework.webp
    │   ├── tech-localization-effect.webp
    │   ├── tech-behavior-framework.webp
    │   ├── tech-behavior-effect.webp
    │   ├── tech-scheduling-framework.webp
    │   ├── tech-scheduling-effect.webp
    │   ├── tech-execution-framework.webp
    │   └── tech-execution-effect.webp
    ├── videos/
    │   └── full-demo.mp4
    └── placeholders/
        └── image-placeholder.svg
```

## 四、素材配置

网站中的主要图片和视频路径统一配置在：

```text
js/assets-config.js
```

需要替换素材时，优先保持原有文件名和目录结构，直接覆盖对应文件即可，无须修改 HTML、CSS 或其他 JavaScript 文件。

### 1. 首页与主要页面图片

```text
assets/images/hero-cover.webp
assets/images/project-overview.webp
assets/images/system-architecture.webp
assets/images/closed-loop-scenarios.webp
assets/images/section-tech-bg.webp
```

### 2. 四项核心技术图片

#### 技术一：可靠定位

```text
assets/images/tech-localization-framework.webp
assets/images/tech-localization-effect.webp
```

#### 技术二：风险预警

```text
assets/images/tech-behavior-framework.webp
assets/images/tech-behavior-effect.webp
```

#### 技术三：协同决策

```text
assets/images/tech-scheduling-framework.webp
assets/images/tech-scheduling-effect.webp
```

#### 技术四：安全执行

```text
assets/images/tech-execution-framework.webp
assets/images/tech-execution-effect.webp
```

### 3. 多端协同图片

```text
assets/images/terminal-robot.webp
assets/images/terminal-web.webp
assets/images/terminal-mobile.webp
```

分别对应：

* 机器人端；
* 网页监控中心；
* 护工移动端。

### 4. 视频文件与封面

完整系统演示视频：

```text
assets/videos/full-demo.mp4
```

视频封面：

```text
assets/images/video-covers/full-demo-cover.webp
```

建议视频采用以下格式：

```text
封装格式：MP4
视频编码：H.264
音频编码：AAC
```

建议开启 faststart，使视频元数据位于文件前部，提高在线播放和进度拖动体验。

## 五、本地运行

建议通过本地 HTTP 服务器运行，不要直接双击 `index.html`。

在项目根目录打开终端，执行：

```bash
python -m http.server 8000
```

随后在浏览器中访问：

```text
http://localhost:8000
```

停止服务器时，在终端中按：

```text
Ctrl + C
```

## 六、页面操作方式

### 桌面端

* 鼠标滚轮：切换上一页或下一页；
* 左右箭头按钮：切换页面；
* 顶部导航栏：直接进入指定页面；
* 分页圆点：直接进入对应页面；
* 方向键：切换页面；
* Page Up / Page Down：切换页面；
* Home：返回首页；
* End：进入最后一页；
* 空格键：进入下一页。

### 移动端

* 点击菜单按钮打开导航；
* 左右滑动切换页面；
* 点击技术标签切换核心技术；
* 点击终端标签切换展示内容；
* 点击图片进入高清查看；
* 使用双指缩放和拖动查看图片细节。

## 七、部署方式

本项目为纯静态网站，上传整个项目目录即可部署。

部署时必须保证以下文件和目录之间的相对位置不变：

```text
index.html
css/
js/
assets/
```

可选部署平台包括：

* GitHub Pages；
* Cloudflare Pages；
* Vercel；
* Netlify；
* Nginx；
* Apache；
* 学校或比赛提供的静态网站服务器。

部署完成后，应检查图片和视频是否能够通过 HTTPS 正常加载。

## 八、部署前检查

正式提交或部署前，建议依次完成以下检查：

* 检查 8 个页面是否均可正常打开；
* 检查页面顺序和导航名称是否正确；
* 检查顶部导航、翻页按钮和分页圆点是否正常；
* 检查鼠标滚轮、键盘方向键和手机滑动是否正常；
* 检查 4 项核心技术是否均可切换；
* 检查每项技术的框架图和效果图是否对应正确；
* 检查学术成果中的论文、专利和文字信息是否准确；
* 检查完整演示视频能否播放、暂停、拖动进度和全屏；
* 检查机器人端、网页监控中心和护工移动端是否能够切换；
* 检查所有图片是否能够进入高清查看器；
* 检查图片缩放、拖拽和复位功能是否正常；
* 检查页面、图片、视频、文件名和元数据中是否包含不应公开的信息；
* 检查团队介绍是否符合比赛匿名要求；
* 分别使用 1920×1080、1366×768 和手机尺寸测试；
* 建议测试时将浏览器缩放比例设置为 100%。

## 九、修改说明

若只需要替换图片或视频，请直接覆盖 `assets` 目录中的对应文件，并保持文件名不变。

若需要修改素材路径，请统一在以下文件中调整：

```text
js/assets-config.js
```

若需要修改页面文字，请编辑：

```text
index.html
js/technology-tabs.js
js/terminal-tabs.js
```

若需要修改页面颜色、字体、布局或动画效果，请编辑：

```text
css/style.css
css/viewer.css
```

除非确有必要，不建议修改页面控制、视频弹窗和图片查看器相关 JavaScript 文件。
