# Talks

讨论文档集 — 用于方案讨论、架构推演与技术交流

## 文档索引

- [AI 驱动软件研发机制 · 四区架构](AI-SE.html) — 外网 AI 创造 + 审查 → 安全摆渡 → 内网适配 → 自动部署
- [金控集团 · 国企智能办公 AI 架构](AI-Architecture.html) — 面向金融控股集团的智能化办公架构方案（含企业指标数据能力发布平台）
- [金控集团 · 审计条线 AI 应用规划](ai-audit.html) — 面向金融控股集团审计条线的 AI 应用规划
- [大模型在审计条线的应用 · 交流材料](AI-Audit-PPT.html) — 大模型用于审计领域的 PPT 风格幻灯片（13 页翻页式）
- [AI Engineering · Prompt → Context → Harness → Loop](AI-Engineering.html) — 大模型应用深化的四次升维：从 Prompt 到 Loop Engineering
- [从 Workflow 到 Agent：企业AI应用的范式转移](workflow-to-agent.html) — Agent 时代，企业通过构建 Agent Runtime 将业务知识、工具能力和领域 Skill 封装为可复用能力

## 更新日志

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
- **新增文档：** 金控集团 · 审计条线 AI 应用规划 ([ai-audit.html](ai-audit.html))

### 2026-06-18
- **架构更新：** 新增 AI 算力路由层作为共享模型网关
- **NanoBot 定位：** 定调为 Skills 服务平台，算力路由管底层模型调度
- **双路 LLM 调用理清：** 调 Skills 走 NanoBot，直接调模型走算力路由