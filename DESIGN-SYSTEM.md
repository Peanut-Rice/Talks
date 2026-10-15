# DESIGN-SYSTEM.md — Talks 文档视觉规范

> 本文件描述的是**本仓库实际在用的**视觉规则，不是理想稿。
> 每条规则都附带判定方法；与代码不符处已明确列为「已知不一致」。

相关文件：
- [`CLAUDE.md`](CLAUDE.md) — 工作约定与新增文档流程
- [`DESIGN.md`](DESIGN.md) — ⚠️ **外部风格参考（Pirsch Analytics），不是本仓库的设计系统**，其 token 与配色在本仓库中零使用，仅作素材存档
- [`README.md`](README.md) — 文档索引与更新日志

---

## 1. 三条不可协商的原则

### 1.1 中文一律用系统字体，绝不下载中文网页字体

**理由（已实测）：** Google Fonts 的 `Noto Sans SC` 按 unicode-range 被切成 **404 个 `@font-face` 子集**，4 个字重合计数 MB 下载；而系统 CJK 字体（macOS `PingFang SC` / Windows `Microsoft YaHei`）质量已足够。

**副作用必须知情：** 移除中文网页字体会改变中文渲染（同为 CJK 字形，差异集中在抗锯齿/次像素层面，正常阅读尺寸下不可分辨）。这不是「零变化」，只是代价可接受。

**判定方法：** 全文搜索 `family=Noto+Sans+SC` 或 `family=Noto+Serif+SC`，命中即违规（唯一例外见 §6）。

### 1.2 拉丁字母与数字用等宽字体，中文用无衬线

科技感来自**排版精度**，不来自霓虹配色。本仓库承担这一职能的是：

```css
--mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
--sans: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Noto Sans SC", "Segoe UI", sans-serif;
```

**不要把中文放进 `--mono`。** `JetBrains Mono` 没有 CJK 字形，中文会由浏览器回退渲染，导致字重与正文不一致——这一缺陷在本仓库历史上出现过两次（`.skill .trigger`、`.flow .step b`）。
`Noto Sans SC` 只作为 Linux/Android 的**本地回退名**保留在 `--sans` 末尾，不发起网络请求。

### 1.3 修改视觉后，用「几何检测」验证，不要用逐像素对照

**逐像素比对本仓库不可靠**，原因是文本页 + 异步网页字体会产生非确定性渲染。实测证据：

| 对象 | 连续 5 次渲染的 `h1` 高度 |
|---|---|
| 首位为 `'Noto Sans SC'` 的旧写法 | 30.0 / **28.0** / 30.0 / 30.0 / 30.0 ← 自身不稳定 |
| 改为 `'DM Sans'` 领先 + 系统 CJK 回退 | 28.0 / 28.0 / 28.0 / 28.0 / 28.0 ← 稳定 |

一次真实的误判记录：某次改动曾报出 39%–70% 的像素差异，排查后确认全部是测量缺陷——① 基线文件放在工作区外，相对路径 `Images/*.jpg` 加载失败；② 旧版字体栈首位 `Noto Sans SC` 对拉丁字形覆盖不全，导致标题渲染在 Noto 与 DM Sans 之间摇摆。

**推荐验证顺序：**
1. **计算字体断言** — `getComputedStyle(el).fontFamily` 首个字体名是否符合预期
2. **几何检测** — 横向溢出、内容裁切（`scrollHeight > clientHeight`）、`scrollWidth > innerWidth`
3. 目视截图 — 仅在需要确认观感时使用

也可用 `document.fonts.check()`，但注意：它返回 `true` 只代表「该 family 可用于匹配」，**不代表字形来自该字体文件**（浏览器可能回退到通用族却仍报 `true`）。

---

## 2. 文档分类（4 类）

| 类型 | 文档 | 关键特征 |
|---|---|---|
| **A 滚动文档** | [`AI-Engineering.html`](AI-Engineering.html)、[`ai_understanding_tool.html`](ai_understanding_tool.html) | 自上而下阅读；卡片网格、流程条、表格 |
| **B 架构图** | [`AI-SE.html`](AI-SE.html)、[`AI-Architecture.html`](AI-Architecture.html) | 核心是 1200–1300px 手写内联 SVG；下方 2–4 列信息卡 |
| **C 幻灯片** | [`AI-Audit-PPT.html`](AI-Audit-PPT.html)、[`workflow-to-agent.html`](workflow-to-agent.html) | 全屏翻页或单页响应式；键盘/滚动/触摸导航 |
| **D 固定主题单页** | [`e-work-intro.html`](e-work-intro.html)、[`index.html`](index.html) | 不参与 4 主题切换，各自一套固定配色；锚点导航或列表 |

---

## 3. 配色家族现状（3 族，尚未收敛）

| 族 | 文档 | 画布 | 主强调色 | 次强调色 |
|---|---|---|---|---|
| **Ⅰ 深空青（4 主题）** | [`index.html`](index.html)、[`AI-SE.html`](AI-SE.html)、[`AI-Architecture.html`](AI-Architecture.html) | `#020617` 深空 / `#f8fafc` 亮白 / `#fef7ed` 暖阳 / `#f0f4f8` 冷杉 | `#22d3ee` cyan（Dark） | `#f59e0b` amber |
| **Ⅱ 浅板岩青绿** | [`workflow-to-agent.html`](workflow-to-agent.html)、[`AI-Engineering.html`](AI-Engineering.html) | `#f4f2ef` 暖灰 | `#2d9d73` teal | `#4a85a8` slate blue |
| **Ⅲ 暖白墨绿金** | [`e-work-intro.html`](e-work-intro.html) | `#f7f5f0` 暖白 | `#1f4438` 深墨绿 | `#b8860b` 琥珀金 |
| **（散列，未 token 化）** | [`ai_understanding_tool.html`](ai_understanding_tool.html) | `#f5f7fb` 冷灰蓝 | `#172033` 墨蓝 | `#eef2ff` 淡紫 |

**强调色配额：** 同一文档内主强调色只用于「数据/连接/关键路径」，次强调色只用于「阈值/警示/次级状态」。不要为装饰新增第三种强调色。

族 Ⅰ 的 4 主题完整 token（取自 [`index.html`](index.html)）：

```css
:root {                    /* dark —— 默认主题 */
  --bg:#020617; --bg-card:rgba(15,23,42,.5); --bg-card-solid:#0f172a;
  --border:#1e293b; --text:#ffffff; --text-secondary:#94a3b8; --text-muted:#475569;
  --accent:#22d3ee; --card-hover:rgba(30,41,59,.5);
}
[data-theme="light"] { --bg:#f8fafc; --bg-card:rgba(255,255,255,.85); --bg-card-solid:#ffffff;
  --border:#e2e8f0; --text:#1e293b; --text-secondary:#64748b; --text-muted:#94a3b8;
  --accent:#0891b2; --card-hover:rgba(241,245,249,.8); }
[data-theme="warm"]  { --bg:#fef7ed; --bg-card:rgba(255,251,245,.9); --bg-card-solid:#fffbf5;
  --border:#fde68a; --text:#3b2f1e; --text-secondary:#78716c; --text-muted:#a8a29e;
  --accent:#f59e0b; --card-hover:rgba(253,230,138,.3); }
[data-theme="cool"]  { --bg:#f0f4f8; --bg-card:rgba(248,250,252,.9); --bg-card-solid:#f8fafc;
  --border:#cbd5e1; --text:#1a2a3a; --text-secondary:#64748b; --text-muted:#94a3b8;
  --accent:#6366f1; --card-hover:rgba(203,213,225,.4); }
```

> **dark 的实现细节：** dark 由 `:root` 承担，**没有** `[data-theme="dark"]` 选择器。因此 `<html>` 上写 `data-theme="dark"` 也能正常工作（回落到 `:root`），但不能靠搜索 `[data-theme="dark"]` 判断某文档是否支持 dark。

---

## 4. 排版规则

### 4.1 字体归属

| 用途 | 字体 | 说明 |
|---|---|---|
| 中文正文/标题 | 系统 CJK（`PingFang SC` / `Microsoft YaHei`） | 不下载 |
| 拉丁字母、数字、代码标签 | `JetBrains Mono` | 下载体积数十 KB |
| 拉丁标题（族 Ⅱ） | `DM Sans` | 与 `JetBrains Mono` 同批请求 |

### 4.2 微标签（本仓库最有效的「科技感」开关）

```css
.tag / .eyebrow / .meta-row {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: .08em;      /* 章节号可用 .18em–.3em */
  text-transform: uppercase;
  opacity: .55 – .75;
}
```

历史上效果最好的是 [`AI-Audit-PPT.html`](AI-Audit-PPT.html) 的 `.chrome` / `.kicker` / `.foot`（`IBM Plex Mono`，字距 `.14em`–`.3em`，透明度 `.5`–`.65`）。

### 4.3 数字

所有指标、编号、进度数值加：

```css
font-variant-numeric: tabular-nums;
```

已应用：[`ai_understanding_tool.html`](ai_understanding_tool.html)、[`e-work-intro.html`](e-work-intro.html)。
[`AI-Audit-PPT.html`](AI-Audit-PPT.html) 用的是等效的 `font-feature-settings:"tnum"`。

### 4.4 中文标题

收紧字距 `letter-spacing: -.02em` 左右，避免中文大字显得松散。

---

## 5. 间距、形状与动效

| 项 | 现状 | 备注 |
|---|---|---|
| 卡片圆角 | 12px（族 Ⅱ）、14–20px（单页）、16px（墨绿）、`0.75rem`（索引） | 未统一 |
| 卡片描边 | 族 Ⅰ 用 `--border` 1px；族 Ⅱ/Ⅲ 用 1px + 轻阴影 | 阴影使用不一致，见 §7 |
| 区块间距 | 56–88px（单页）、48px（族 Ⅱ） | |
| 响应式断点 | 480 / 560 / 640 / 700 / 800 / 860 / 900 px | 各文档自选，未统一；两个架构图文档无断点 |
| 入场动效 | `translateY(12–24px)` + `opacity` | 只做位移与淡入，不做扫描线/故障字等装饰效果 |

**减动效：** 有动画的文档必须支持 `prefers-reduced-motion: reduce`。
现状：[`workflow-to-agent.html`](workflow-to-agent.html)、[`e-work-intro.html`](e-work-intro.html)、[`AI-Engineering.html`](AI-Engineering.html)、[`AI-Audit-PPT.html`](AI-Audit-PPT.html) 已支持。

**打印：** 有 `position:fixed` 顶栏或主题切换器的文档应提供 `@media print` 隐藏交互 UI。
现状：[`index.html`](index.html)、[`AI-SE.html`](AI-SE.html)、[`AI-Architecture.html`](AI-Architecture.html)、[`AI-Engineering.html`](AI-Engineering.html) 有；[`e-work-intro.html`](e-work-intro.html) **缺**（有 fixed 顶栏 + `backdrop-filter`，打印会糊）。

---

## 6. 唯一例外：AI-Audit-PPT 保留中文网页字体

[`AI-Audit-PPT.html`](AI-Audit-PPT.html) 请求 `Playfair Display + Source Serif 4 + IBM Plex Mono + Noto Serif SC + Noto Sans SC`。

**这是刻意保留的，不要「顺手优化」掉。** 该文档是 13 页幻灯片的印刷级排版，中文衬线（`Noto Serif SC`）是其视觉核心，不是可选装饰。它同时是唯一使用衬线字体的文档。

---

## 7. 已知不一致（待收敛，按优先级）

1. **配色家族未收敛** —— 3 族 + 1 组散列共存。新文档应复用族 Ⅰ 或族 Ⅱ，不要再开新色板。
2. **[`ai_understanding_tool.html`](ai_understanding_tool.html) 配色未 token 化** —— 颜色全是散列字面量（`#172033`、`#f5f7fb`、`#eef2ff`…）。它的 `:root` 只有排版升级时加入的 `--sans` / `--mono` 两个变量，没有颜色变量。建议抽出 `--bg` / `--ink` / `--accent`。
3. **阴影政策不一致** —— [`AI-Engineering.html`](AI-Engineering.html) 9 处 `box-shadow`、[`e-work-intro.html`](e-work-intro.html) 6 处，而族 Ⅰ 基本不用阴影。族 Ⅰ 的「描边优先、克制阴影」是更好的方向。
4. **[`e-work-intro.html`](e-work-intro.html) 缺打印样式**，且 640px 以下 `.nav-links{display:none}` 隐藏全部导航且无替代菜单。
5. **无障碍普遍缺失** —— 全仓 `aria-*` 出现次数为 0；[`AI-Audit-PPT.html`](AI-Audit-PPT.html) 的翻页按钮无 `aria-label`；[`ai_understanding_tool.html`](ai_understanding_tool.html) 的 `.tool` 是 `onclick` 的 `div`，键盘不可达。
6. **[`index.html`](index.html) 的 `NEW` 徽章不自动过期** —— 7 个条目挂 `NEW`，最久的来自 6 月。

### 各文档断点明细

| 文档 | `max-width` 断点 |
|---|---|
| [`AI-Architecture.html`](AI-Architecture.html) | 无（仅容器 1350px） |
| [`AI-SE.html`](AI-SE.html) | 无（仅容器 1400px） |
| [`AI-Audit-PPT.html`](AI-Audit-PPT.html) | 900 |
| [`ai_understanding_tool.html`](ai_understanding_tool.html) | 700, 800（另容器 1120 / 900） |
| [`AI-Engineering.html`](AI-Engineering.html) | 480, 900（另容器 1100） |
| [`e-work-intro.html`](e-work-intro.html) | 560, 640, 900（另容器 1080） |
| [`index.html`](index.html) | 640（另容器 900） |
| [`workflow-to-agent.html`](workflow-to-agent.html) | 480, 560, 860, 1024, 1280 |

---

## 8. 新增文档检查清单

- [ ] 复用族 Ⅰ 或族 Ⅱ 配色，**不新开色板**
- [ ] 中文不请求网页字体；拉丁/数字用 `--mono`
- [ ] 微标签等宽 + 大写 + 字距；数字加 `tabular-nums`
- [ ] 不含 `Noto Sans SC` / `Noto Serif SC` 的网络请求（例外见 §6）
- [ ] 有动画则支持 `prefers-reduced-motion`
- [ ] 有 fixed 顶栏或交互 UI 则提供 `@media print`
- [ ] 图片路径 `Images/`（**大写 I**，GitHub Pages 大小写敏感）
- [ ] **同时**登记到 [`index.html`](index.html) 与 [`README.md`](README.md)
- [ ] 验证方式用 §1.3 的几何检测 + 计算字体断言，不用逐像素对照
