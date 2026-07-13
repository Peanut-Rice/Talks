# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Identity

**Talks** — 金控集团 AI 架构讨论文档集。所有文件为纯静态 HTML，零依赖，内联 CSS/JS，直接用浏览器打开即可阅读。

## Document Types and Their Conventions

This repo contains three kinds of HTML documents, each with distinct patterns:

### 1. Scrolling Documents (ai-audit.html, AI-Engineering.html)
Standard top-to-bottom reading flow. Content organized in sections with grid cards, tables, or flow diagrams. Scroll-triggered animations via IntersectionObserver.

### 2. Architecture Diagrams (AI-SE.html, AI-Architecture.html)
Centerpiece is a large hand-crafted inline SVG diagram (1200-1300px wide). Below the SVG: info cards in a 2-4 column grid. SVG elements use `data-*` attributes for theme-aware color switching. Gold/cyan glow filters (`feGaussianBlur`) highlight key components.

### 3. Slide Decks (AI-Audit-PPT.html, workflow-to-agent.html)
- **AI-Audit-PPT.html**: 13 full-screen slides, keyboard/scroll/touch navigation, dual WebGL canvas backgrounds (dark + light modes), Motion library for entrance animations, slide dots indicator. Press `B` to toggle low-power mode.
- **workflow-to-agent.html**: Single-page responsive slide. Two-column on desktop, stacked on mobile. Fixed light theme.

## Theme System

Most documents share a 4-theme CSS custom property system toggled via `<html data-theme="dark|light|warm|cool">`:

```
dark  → --bg: #020617 (deep navy)
light → --bg: #f8fafc (off-white)
warm  → --bg: #fef7ed (cream)
cool  → --bg: #f0f4f8 (light gray-blue)
```

When adding a new document that uses this system, copy the `:root` / `[data-theme]` blocks and the theme-switcher JS from `index.html` or `ai-audit.html`. The circular color buttons in the top-right are the standard UI.

**Exceptions**: `workflow-to-agent.html` has a fixed light-slate-teal palette (no switcher). `AI-Audit-PPT.html` has per-slide light/dark.

## Adding a New Document

1. Create `topic-name.html` with all CSS/JS inline (no external files)
2. If it's a theme-supported document, include the 4-theme system
3. Reference images with relative paths: `Images/filename.png`
4. Add an entry to **both** `index.html` (file-card in the list) and `README.md` (文档索引 + 更新日志)
5. Images go in `Images/` — keep files under ~500KB where possible; the existing `Workflow vs Agent.png` at 1.2MB is an outlier

## Fonts

All documents load fonts from Google Fonts. The repo uses three font stacks depending on document type:

| Stack | Fonts | Used In |
|-------|-------|---------|
| Mono | `JetBrains Mono` | index, AI-SE, AI-Architecture, AI-Engineering, ai-audit |
| Mixed serif/sans | `Playfair Display` + `Source Serif 4` + `IBM Plex Mono` + `Noto Serif SC` + `Noto Sans SC` | AI-Audit-PPT |
| Sans + Mono | `Noto Sans SC` + `DM Sans` + `JetBrains Mono` | workflow-to-agent |

For Chinese-heavy content, always include a CJK-capable font (`Noto Sans SC` or `Noto Serif SC`). The Latin-only fonts in the stacks render titles and code labels.

## Responsive Design

Most documents target desktop first with breakpoints at 640px, 860px, or 900px for mobile stacking. Architecture diagrams with large SVGs scale using `max-width: 100%` on the SVG element rather than reflowing internal elements. Print styles (`@media print`) force white backgrounds and hide interactive UI.

## Static Site — No Build Step

There is no `package.json`, no bundler, no build scripts. Open any `.html` file directly in a browser. When modifying, edit the single file — all styles and scripts are inline.
