# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Identity

**Talks** — 金控集团 AI 架构讨论文档集。所有文件为纯静态 HTML，内联 CSS/JS，无构建步骤，直接用浏览器打开即可阅读。

**视觉规范见 [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md)** — 字体归属、配色家族、微标签、验证方法都在那里。改视觉前先读它。
[`DESIGN.md`](DESIGN.md) 是**外部风格参考（Pirsch Analytics）**，其 token 在本仓库零使用，不要当成规范。

## Document Types and Their Conventions

This repo contains four kinds of HTML documents:

### 1. Scrolling Documents — `AI-Engineering.html`, `ai_understanding_tool.html`
Standard top-to-bottom reading flow. Sections with grid cards, tables, or flow diagrams. Scroll-triggered animations via IntersectionObserver (must have a no-JS fallback: if `IntersectionObserver` is absent, reveal all elements).

### 2. Architecture Diagrams — `AI-SE.html`, `AI-Architecture.html`
Centerpiece is a large hand-crafted inline SVG diagram (1200–1300px wide). Below the SVG: info cards in a 2–4 column grid. SVG uses `data-*` attributes for theme-aware color switching; glow via `feGaussianBlur` (`stdDeviation` 2–3, key paths only). **These two documents have no responsive breakpoints** — the diagram scales via `max-width:100%` on the SVG, and `.diagram-container svg` keeps `min-width:1200px`.

### 3. Slide Decks — `AI-Audit-PPT.html`, `workflow-to-agent.html`
- **`AI-Audit-PPT.html`**: 13 full-screen slides, keyboard/scroll/touch navigation, dual WebGL canvas backgrounds, Motion library, slide dots. Press `B` for low-power mode. Uses a serif stack on purpose — see DESIGN-SYSTEM.md §6.
- **`workflow-to-agent.html`**: Single-page responsive slide, two-column on desktop. Fixed light theme.

### 4. Fixed-Theme Single Pages — `e-work-intro.html`, `index.html`
Do **not** participate in the 4-theme switcher; each has its own fixed palette. `e-work-intro.html` has a fixed top nav with anchor links + scrollspy; `index.html` is the document index.

## Theme System

**Only 3 of 8 documents** use the 4-theme system: `index.html`, `AI-SE.html`, `AI-Architecture.html`. Toggled via `<html data-theme="dark|light|warm|cool">`; the circular color buttons top-right are the standard UI.

| Theme | `--bg` |
|-------|--------|
| dark | `#020617` deep navy |
| light | `#f8fafc` off-white |
| warm | `#fef7ed` cream |
| cool | `#f0f4f8` light gray-blue |

**`dark` is implemented in `:root` — there is no `[data-theme="dark"]` selector.** Copy the `:root` / `[data-theme]` blocks and switcher JS from `index.html`.

**Do not add the 4-theme system to new documents by default.** The newer documents are deliberately fixed-theme; prefer reusing an existing palette family over opening a new one (DESIGN-SYSTEM.md §3).

## Adding a New Document

1. Create `topic-name.html` with all CSS/JS inline. **Only permitted external dependency is Google Fonts, and only for Latin/numeric fonts** — never request a CJK web font (`Noto Sans SC` / `Noto Serif SC`), see DESIGN-SYSTEM.md §1.1.
2. Reuse palette family Ⅰ (`#020617` nav / cyan) or Ⅱ (warm gray / teal). Don't invent a new palette.
3. Reference images with relative paths: `Images/filename.png` — **capital `I`**. GitHub Pages is case-sensitive; lowercase `images/` silently works on Windows and 404s in production.
4. Add an entry to **both** `index.html` (file-card in the list) and `README.md` (文档索引 + 更新日志).
5. Images go in `Images/` — keep files under ~500KB where possible; the existing `Workflow vs Agent.png` at 1.2MB is an outlier.

## Fonts

Chinese is **never** fetched as a web font — multi-MB cost with no benefit over system CJK fonts. Latin and digits use a small monospace font.

| Role | Font | Documents |
|------|------|-----------|
| 中文正文/标题 | system CJK (`PingFang SC` / `Microsoft YaHei`) | all |
| 拉丁 + 数字 + 代码标签 | `JetBrains Mono` | index, AI-SE, AI-Architecture, AI-Engineering, ai_understanding_tool, e-work-intro |
| 拉丁标题 | `DM Sans` | AI-Engineering, workflow-to-agent |
| 印刷级衬线（例外） | `Playfair Display` + `Source Serif 4` + `IBM Plex Mono` + `Noto Serif SC` + `Noto Sans SC` | AI-Audit-PPT only |

**Never put Chinese text in a `--mono` stack** — the monospace family has no CJK glyphs, so Chinese silently falls back and ends up with a mismatched weight. This has broken twice in this repo's history.

## Verification

After any visual change, verify with **computed-font assertions + geometry checks** (overflow / clipping / horizontal scroll) — **not** pixel-diff comparison. Text pages with async web fonts render non-deterministically; a same-file double render can differ. See DESIGN-SYSTEM.md §1.3 for the recorded misdiagnosis.

## Responsive Design

Desktop-first, with per-document breakpoints at 480 / 560 / 640 / 700 / 800 / 860 / 900 px (see DESIGN-SYSTEM.md §7 for the per-document table). The two architecture-diagram documents have no breakpoints at all. Documents with animation must honor `prefers-reduced-motion: reduce`. Documents with a `position:fixed` bar or interactive UI should provide `@media print` to hide it.

## Static Site — No Build Step

There is no `package.json`, no bundler, no build scripts. Open any `.html` file directly in a browser. When modifying, edit the single file — all styles and scripts are inline.
