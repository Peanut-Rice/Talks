# DESIGN-SYSTEM.md — Talks 文档视觉规范

> 本文件描述的是**本仓库实际在用的**视觉规则，不是理想稿。
> 每条规则都附带判定方法；与代码不符处已明确列为「已知不一致」。
> 2026-10 改版：视觉系统改由 [`DESIGN.md`](DESIGN.md)（Pirsch Analytics 风格参考）正式接管，
> 原「四套可切换主题」已移除。旧版规范可从 git 历史取回。

相关文件：
- [`CLAUDE.md`](CLAUDE.md) — 工作约定与新增文档流程
- [`DESIGN.md`](DESIGN.md) — **品牌与视觉系统来源**：暖纸面 / 墨线 / 阳光黄 / 单一无衬线
- [`README.md`](README.md) — 文档索引与更新日志
- [`assets/site.css`](assets/site.css) — 全站唯一的样式表
- [`assets/site.js`](assets/site.js) — 文档页入场动效

---

## 1. 系统一览

| 项 | 值 |
| --- | --- |
| 画布 | 暖纸面 `#f8f5ed`（`--cream`），不出现纯白页面 |
| 墨色 | `#000000`。正文一律满墨；`--graphite #707070` 只给次要说明与元数据 |
| 强调色 | 阳光黄 `#ffda6e`，克制使用：主操作、当前筛选态、站点标记点 |
| 状态色 | 薄荷绿 `#6ece9d`，只做状态信号，不做按钮底色 |
| 字体 | DM Sans 400/500（拉丁）＋ 系统 CJK 回退 `PingFang SC` / `Microsoft YaHei` / `Noto Sans SC` |
| 圆角 | 卡片 24px；图片与标签 12px；输入 6px；胶囊 9999px |
| 分区 | 只用一档色调差：`--cream-tint #fdfbf6` / `--cream-deep #f1ece0` |
| 间距 | 8px 基数：8 / 16 / 24 / 32 / 48 / 64 / 96 |

**不使用**：投影、渐变、玻璃模糊、发丝分隔线、等宽字体（真正的代码除外）、装饰性编号、
标题上方的小标签（eyebrow）、emoji 当 UI、多主题切换。

## 2. 文件结构

- `assets/site.css` — 唯一样式表。顺序：tokens → 基础排版 → 索引页 → 文档页 → 响应式 → 减少动效 → 打印。
- `assets/site.js` — 文档页入场（IntersectionObserver）与卡片落位。
- `index.html` — 索引页。文档清单位于脚本里的 `DOCS` 数组，**新增文档只改这一处**。
- 其余 `*.html` — 文档页，各自保留 `<svg>` 图版与正文，共用上面两个资源。

## 3. 不可协商的规则

1. **中文一律用系统字体，不下载中文网页字体。**
   理由（已实测）：Google Fonts 的 `Noto Sans SC` 按 unicode-range 被切成数百个 `@font-face` 子集，
   一次访问拉取 MB 级流量；系统 CJK 字体质量已足够。
   *判定：* 全文搜索 `family=Noto+Sans+SC` 或 `family=Noto+Serif+SC`，命中即违规。
2. **不引入第二套拉丁字体。** 一律走 `--sans` 回退链。
3. **页面内没有自己的 `<style>` 块。** 所有样式进 `assets/site.css`；页面里只留说明性注释。
4. **索引的类别筛选必须来自真实数据**：某类别只有一篇时不生成筛选标签
   （`index.html` 中 `counts[kind] > 1`）。
5. **内容不得因脚本失败而消失。** 默认态可见，隐藏态只在 `html.js` 下生效；索引脚本与 `site.js` 都遵守。
   *判定：* 禁用 JS 打开页面，全部条目仍可见可点。
6. **图版是插画，不是页面着色。** 文档页里的大 `<svg>` 架构图保留原有深色画法；它内部的
   一像素描边、发光滤镜、区域渐变与图例符号**不适用**页面级禁令。这些行带 `taste-skill-ignore`
   注释并写明理由。
7. **文档页首屏必须有主角。** 抬头 `h1` 在桌面端约 60px（`clamp(2.25rem, 1.4rem + 2.6vw, 3.75rem)`），
   这是「首屏需有主导元素」的判定门槛。

## 4. 允许清单

`.taste-skill/allow.json` 记录方向性豁免（无照片、无视频、暖纸面），供 `inspect.mjs` 自动读取。
允许清单**只用于契约与品牌决定的约束**，不用于掩盖可修的问题。

## 5. 验证方法

```bash
node <skill>/scripts/lint.mjs   <file>   # 源码层禁用模式
node <skill>/scripts/inspect.mjs <file>  # 真 Chrome，1440/768/390 三档实测＋截图
```

截图与报告落盘到 `.taste-skill/inspect/`；改动前的原稿在 `.taste-skill/backup/`。

## 6. 新增文档：照 `_template-doc.html` 抄

`_template-doc.html` 是规范的可执行形式，本身通过 lint 与实测检查。要点：

1. `<head>`：DM Sans（只引拉丁）＋ `assets/site.css` ＋ 一行 `document.documentElement.classList.add('js')`。
2. `<body class="doc">`。
3. 复制 `.site-nav`（全站一致，只改当前页高亮）。
4. 抬头固定为 `<header class="doc-header">` ＋ **全页唯一 `<h1>`**（桌面端约 60px，首屏主角就是它）。
5. 每节一个 `<h2>`；旁注用 `.note`；要点用 `.cards > .card`；图版用 `.diagram-container`。
6. 页脚复用 `.site-foot`；结尾挂 `<script src="assets/site.js"></script>`。
7. 新增文档后，在 `index.html` 的 `DOCS` 数组加一条（**索引的唯一数据源**），类别只有 1 篇时不会生成筛选标签。
8. 提交前跑 `lint.mjs` 与 `inspect.mjs`；两者都干净才算完成。

**不要**：页面内写 `<style>`；引第二套字体或中文网页字体；用 emoji 当图例；在标题上方放小标签；用 `01 / 02` 这类独立编号；把卡片描边加阴影。

**节次编号的算法**：想给章节编号就用真实的 `<ol>`，或者把编号**写进标题文字**（"第一步：…"）。
考试式的独立编号块会被判定为 eyebrow / numbering，且实测表明它不提供任何定位价值。

## 7. 已知不一致（待办）

改版后 8 页实测（`inspect.mjs` 三档真机测量）：

| 页面 | lint | 实测 | 剩余问题 |
| --- | --- | --- | --- |
| `index.html` | 0 | **0 FAIL** / 1 WARN | 仅次要灰正文 4.8:1（系统要求的次要色） |
| `AI-Architecture.html` | 0 | **0 FAIL** / 1 WARN | 首屏无按钮（文档页性质） |
| `AI-SE.html` | 0 | **0 FAIL** / 2 WARN | 同上＋灰正文 |
| `ai_understanding_tool.html` | 0 | 2 FAIL | 首屏无主角（`h1` 只有 4.2vw，需提到 `display` 档）、动效不足 |
| `AI-Engineering.html` | 0 | 1 FAIL | 动效不足、末屏偏空 |
| `workflow-to-agent.html` | 0 | 4 FAIL | 首屏无 `<h1>` 语义、标题在 390px 折 4 行、正文 13.6px、动效不足 |
| `e-work-intro.html` | 9 | 3 FAIL | 抬头 kicker 与章节编号、末屏偏空、卡片行重复、混排字体 |
| `AI-Audit-PPT.html` | 7 | 超时 | 它是一套带翻页脚本的演示稿（键盘翻页/低功耗开关），需要单独决定是保留"演示稿"形态还是改成分节长文 |

**lint 全站 FAIL：143 → 16。** 剩余 16 条集中在 `e-work-intro` 与 `AI-Audit-PPT` 的
`eyebrow`：这两页把节次编号与标题分成两行摆放，几何上就构成"标题上方的小标签"。
CSS 的 `display:inline` 改不了它的基线位置，真正的修法是**把编号并进标题文字**或改用 `<ol>`。


