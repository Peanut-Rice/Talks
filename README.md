# Talks

讨论文档集 — 用于方案讨论、架构推演与技术交流

## 文档索引

- [设计规范 · Design System](DESIGN-SYSTEM.md) — 视觉规则的事实来源：中文走系统字体、拉丁与数字走等宽、配色家族、验证方法（**改视觉前先读**）。[DESIGN.md](DESIGN.md) 是外部风格参考（Pirsch Analytics），非本仓库规范
- [AI 的下一步 · 从生成答案到生成理解工具](ai_understanding_tool.html) — AI 学习记录上的认知节点：AI 产出正从"答案"变成"认知工具"，理解成为新瓶颈；含 ASD-STE100 改写对照、"应用 vs 能力"可视化与交互实验
- [E-Work · 你的 AI 同事](e-work-intro.html) — 集团内网 AI 智能助手使用手册：三种工作方式、六项核心技能与 addoil 出错兜底机制
- [AI 驱动软件研发机制 · 四区架构](AI-SE.html) — 外网 AI 创造 + 审查 → 安全摆渡 → 内网适配 → 自动部署
- [金控集团 · 国企智能办公 AI 架构](AI-Architecture.html) — 面向金融控股集团的智能化办公架构方案（含企业指标数据能力发布平台）
- [大模型在审计条线的应用 · 交流材料](AI-Audit-PPT.html) — 大模型用于审计领域的 PPT 风格幻灯片（13 页翻页式）
- [AI Engineering · Prompt → Context → Harness → Loop](AI-Engineering.html) — 大模型应用深化的四次升维：从 Prompt 到 Loop Engineering
- [从 Workflow 到 Agent：企业AI应用的范式转移](workflow-to-agent.html) — Agent 时代，企业通过构建 Agent Runtime 将业务知识、工具能力和领域 Skill 封装为可复用能力

## 更新日志

### 2026-10-03
- **新增规范：** [设计规范 · Design System](DESIGN-SYSTEM.md) — 把此前散落在各文档中的视觉约定固化为可执行规则：中文不下载网页字体（附实测依据与副作用说明）、拉丁/数字走等宽、微标签写法、配色家族划分、以及**用几何检测而非逐像素对照做视觉验证**（附一次误判的完整记录）。同时重写 [`CLAUDE.md`](CLAUDE.md)：文档分类由 3 类修正为 4 类、字体表与主题说明改为与代码一致、明确 `Images/` 大小写与「禁止把中文放进 `--mono`」
- **排版升级（续）：** E-Work · 你的 AI 同事 ([e-work-intro.html](e-work-intro.html)) 接入同一套排版策略 — 拉丁与数字改用 `JetBrains Mono` + `tabular-nums`（编号、TIP 序号、Hero 统计数字对齐）
- **决策记录（含一次自我修正）：** 中文**不**引入网页字体。实测 Google Fonts 的 `Noto Sans SC` 按 unicode-range 切分为 404 个 `@font-face` 子集、4 个字重合计数 MB，且不覆盖拉丁字形。故中文改用系统 CJK 字体栈（`PingFang SC` / `Microsoft YaHei` / `Noto Sans SC` 本地回退），只下载体积很小的等宽字体。**注意：** 移除后中文渲染确实会变（经 2 倍缩放逐像素实测，同为 CJK 字形、差异集中在抗锯齿层面，正常阅读尺寸下不可分辨），并非"零视觉变化"——这一点曾判断有误，特此更正
- **清理：** 移除 AI 的下一步 ([ai_understanding_tool.html](ai_understanding_tool.html)) 中未被实际使用的 `Noto Sans SC` 字体请求，与其余文档的字体加载策略对齐
- **清理：** AI Engineering ([AI-Engineering.html](AI-Engineering.html)) 与 从 Workflow 到 Agent ([workflow-to-agent.html](workflow-to-agent.html)) 同样移除中文网页字体请求，保留 `DM Sans`（拉丁）与 `JetBrains Mono`；中文改用 `PingFang SC` / `Microsoft YaHei` 系统字体，字体栈长度已统一。几何检测确认无溢出、无裁切、无横向滚动
- **说明：** 上述清理使 AI-Engineering 的 `h1` 字体栈首位由 `Noto Sans SC` 变为 `DM Sans`。原写法下 `Noto Sans SC` 对拉丁字形覆盖不全，导致标题渲染在 Noto 与 DM Sans 之间摇摆（字高在 30px / 28px 间波动）；改后拉丁恒定由 DM Sans 渲染，渲染稳定性反而提升
- **修复：** E-Work 文档中 `.skill .trigger` 的六处中文文案（如"读 PDF · 提取表格 · 合并"）原本挂在等宽字体栈上，中文字形由浏览器回退渲染、字重与正文不一致，已改回无衬线栈
- **排版升级：** 双字体栈落地 — 拉丁与数字统一走 `JetBrains Mono`（等宽 + `tabular-nums`），微标签改为等宽大写宽字距。先行应用于 ([ai_understanding_tool.html](ai_understanding_tool.html))，做法为纯增量：新增 `--sans` / `--mono` token 与字体 `<link>`，不改配色、布局与信息结构
- **修复：** 从 Workflow 到 Agent ([workflow-to-agent.html](workflow-to-agent.html)) 的配图路径大小写错误（`images/` → `Images/`），在大小写敏感的环境（GitHub Pages / Linux）下原本会 404
- **新增文档：** AI 的下一步 · 从生成答案到生成理解工具 ([ai_understanding_tool.html](ai_understanding_tool.html)) — 固定浅色主题单页，是这条学习线上第一次把镜头从"AI 能做什么"转向"理解本身"。同一思想的两种表达（普通咨询式 vs 接近 ASD-STE100）对照、因果链拆解、"应用 → 能力"双向图示、以及一个"应用数量 × 能力复用"交互实验；落点是"未来 AI 可以产生大量一次性的、定制的、用完即丢的认知工具"
- **替换文档：** AI 的下一步 · 从生成答案到生成理解工具 取代了早先的 `ai_understanding_asd_ste100.html` — 从"通用理解路径 + 自由输入模拟器"收敛为围绕"应用建设 → 能力建设"单一命题的完整论证

### 2026-08-13
- **新增文档：** E-Work · 你的 AI 同事 ([e-work-intro.html](e-work-intro.html)) — 集团内网 AI 智能助手使用手册。内容整合自 E-Work 项目三份源文件：SOUL.md（人格 + 协议底座）、quickstart（教学入口）、addoil（失败激活开关）

### 2026-07-27
- **移除文档：** 金控集团 · 审计条线 AI 应用规划（`ai-audit.html`） — 内容已整合至其他文档
- **更新文档：** AI 架构 ([AI-Architecture.html](AI-Architecture.html))、审计条线交流材料 ([AI-Audit-PPT.html](AI-Audit-PPT.html))

### 2026-07-23
- **架构图更新：** 从实现蓝图向能力架构收敛 — 去掉了图例、治理约束层和大量标注，结构本身开始自解释
- **业务层重构：** 从五系统独立连接抽象为"调用 Skills / MCP 数据"两条能力路径
- **模型网关升维：** 不再仅是 LiteLLM 技术选型，承载五维能力（接入 / 调度 / 治理 / 运营 / 审计）
- **信息卡简化：** 去掉技术选型括号 —"用什么"淡出，"能做什么"浮现
- **表达层进化：** 底层逻辑不变，表达层持续收敛

### 2026-07-13
- **新增文档：** 从 Workflow 到 Agent · 企业AI应用的范式转移 ([workflow-to-agent.html](workflow-to-agent.html)) — 浅色主题响应式幻灯片，支持 PC / 手机双端阅读

### 2026-07-09
- **新增文档：** AI Engineering · Prompt → Context → Harness → Loop ([AI-Engineering.html](AI-Engineering.html)) — 大模型应用四次升维与 Token 成本膨胀分析
- **新增文档：** 大模型在审计条线的应用 · 交流材料 ([AI-Audit-PPT.html](AI-Audit-PPT.html)) — 大模型用于审计领域的 PPT 风格幻灯片


### 2026-07-06
- **架构更新：** MCP-指标库从 3 原子工具扩展为四类能力组（Query / Analysis / Metadata / Governance）
- **新增：** 企业指标数据能力发布平台方案 — Hadoop + Trino + Google MCP Toolbox
- **治理约束层补充：** 增加"外部 Agent 须经网关鉴权"
- **架构图更新：** 统一指标库底部标注技术栈（Trino → Hadoop · Google MCP Toolbox）

### 2026-06-23
- **新增文档：** 金控集团 · 审计条线 AI 应用规划（`ai-audit.html`，已于 2026-07-27 移除）

### 2026-06-18
- **架构更新：** 新增 AI 算力路由层作为共享模型网关
- **NanoBot 定位：** 定调为 Skills 服务平台，算力路由管底层模型调度
- **双路 LLM 调用理清：** 调 Skills 走 NanoBot，直接调模型走算力路由