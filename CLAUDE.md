# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Identity

**Talks** — 金控集团 AI 架构讨论文档集。纯静态 HTML，**无构建步骤**，直接用浏览器打开即可阅读。

**视觉规范见 [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md)。**
[`DESIGN.md`](DESIGN.md) 是**品牌与视觉系统来源**（暖纸面 / 墨线 / 阳光黄 / 单一无衬线）——是本仓库的规范。
改视觉前先读 DESIGN-SYSTEM.md。

2026-10 改版后，全站样式集中在两个文件里：

| 文件 | 作用 |
| --- | --- |
| `assets/site.css` | 全站唯一的样式表（tokens → 排版 → 索引页 → 文档页 → 响应式 → 减少动效 → 打印） |
| `assets/site.js` | 文档页入场动效（IntersectionObserver），内容默认可见 |
| `_template-doc.html` | 新增文档的模板，本身通过 lint 与实测检查 |

## 页面结构

- `index.html` — 索引页。文档清单位于脚本里的 `DOCS` 数组，**这是索引的唯一数据源**。
- 其余 `*.html` — 文档页，各自保留 `<svg>` 图版与正文，共用 `assets/site.css` 与 `assets/site.js`。

页面里**没有** `<style>` 块，**没有**主题切换（旧的四主题系统已移除），**没有**内联调色板。
新增页面请从 `_template-doc.html` 复制，不要手写 head 与导航。

## Adding a New Document

1. 复制 `_template-doc.html` 为 `topic-name.html`，改标题、导语、正文。
2. 抬头固定为 `<header class="doc-header">` ＋ **全页唯一 `<h1>`**（桌面端约 60px，首屏主角就是它）。
3. 每节一个 `<h2>`；旁注用 `.note`；要点用 `.cards > .card`；图版用 `.diagram-container`。
4. 在 `index.html` 的 `DOCS` 数组加一条（标题、一句话说明、日期、类别）。类别只有 1 篇时不会生成筛选标签。
5. 在 `README.md` 的文档索引与更新日志里各加一条。
6. 图片放 `Images/`（**大写 I**，GitHub Pages 区分大小写），尽量 <500KB。
7. 提交前跑 `lint.mjs` 与 `inspect.mjs`（见下），两个都干净才算完成。

## Fonts

| 角色 | 字体 |
| --- | --- |
| 中文 | 系统 CJK：`PingFang SC` / `Microsoft YaHei` / `Noto Sans SC`（本地回退，不发网络请求） |
| 拉丁与数字 | `DM Sans` 400/500 |

**中文一律用系统字体，绝不下载中文网页字体**：Google Fonts 的 `Noto Sans SC` 按 unicode-range 被切成数百个子集，
一次访问拉取 MB 级流量，收益为零。判定：全文搜索 `family=Noto+Sans+SC`，命中即违规。

**不要**引入第二套拉丁字体，也不要把中文放进等宽字体栈（等宽族没有 CJK 字形，中文会静默回退成不匹配的字重——
这条在本仓库历史上坏过两次）。

## 不要做的事

- 页面内写 `<style>` 或内联调色板。
- 用 emoji 当图例（emoji 一律删掉，换文字或图形）。
- 在标题上方放小标签（kicker / eyebrow）；想给章节编号就把编号写进标题文字，或用真实的 `<ol>`。
- 用 `01 / 02 / 03` 这类独立编号块。
- 给卡片描边、加阴影、加渐变（分区一律用一档色调差）。
- 让内容依赖脚本才出现：默认态必须可见，隐藏态只在 `html.js` 下生效。
- 依赖中文等宽或中文衬线网页字体。

## Verification

改视觉后必须跑两道门禁：

```bash
node ~/.dsh/skills/design-taste-frontend/scripts/lint.mjs   <file>   # 源码层禁用模式
node ~/.dsh/skills/design-taste-frontend/scripts/inspect.mjs <file>  # 真 Chrome，1440/768/390 实测＋截图
```

截图与报告落在 `.taste-skill/inspect/`，改动前的原稿在 `.taste-skill/backup/`。
方向性豁免写在 `.taste-skill/direction.json`（`inspect.mjs` 自动读取）。

验证方式用**计算样式断言 + 几何检查**（溢出 / 裁剪 / 横向滚动），**不要**用像素级 diff：
带异步网页字体的文本页渲染不确定，同一文件两次渲染都可能不同。见 DESIGN-SYSTEM.md §1.3 记录的误判。

## Responsive & Motion

桌面优先。断点集中在 `assets/site.css`（900px 与 640px 两档），不再逐页散落。
动效一律 `transform` / `opacity`，且必须有 `prefers-reduced-motion: reduce` 回退。
有 `position:fixed` 元素或交互 UI 的页面要提供 `@media print` 隐藏它（已在共享层处理）。

## Static Site — No Build Step

没有 `package.json`、没有打包器、没有构建脚本。任何 `.html` 直接用浏览器打开即可。
