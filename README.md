# Talks

讨论文档集 — 用于方案讨论、架构推演与技术交流

## 文档索引

- [AI 的下一步 · 从生成答案到生成理解工具](ai_understanding_tool.html) — AI 学习记录上的认知节点：AI 产出正从"答案"变成"认知工具"，理解成为新瓶颈；含 ASD-STE100 改写对照、"应用 vs 能力"可视化与交互实验
- [E-Work · 你的 AI 同事](e-work-intro.html) — 集团内网 AI 智能助手使用手册：三种工作方式、六项核心技能与 addoil 出错兜底机制
- [AI 驱动软件研发机制 · 四区架构](AI-SE.html) — 外网 AI 创造 + 审查 → 安全摆渡 → 内网适配 → 自动部署
- [金控集团 · 国企智能办公 AI 架构](AI-Architecture.html) — 面向金融控股集团的智能化办公架构方案（含企业指标数据能力发布平台）
- [大模型在审计条线的应用 · 交流材料](AI-Audit-PPT.html) — 大模型用于审计领域的 PPT 风格幻灯片（13 页翻页式）
- [AI Engineering · Prompt → Context → Harness → Loop](AI-Engineering.html) — 大模型应用深化的四次升维：从 Prompt 到 Loop Engineering
- [从 Workflow 到 Agent：企业AI应用的范式转移](workflow-to-agent.html) — Agent 时代，企业通过构建 Agent Runtime 将业务知识、工具能力和领域 Skill 封装为可复用能力

## 更新日志

### 2026-10-03
- **新增文档：** AI 的下一步 · 从生成答案到生成理解工具 ([ai_understanding_tool.html](ai_understanding_tool.html)) — 固定浅色主题单页，是这条学习线上第一次把镜头从"AI 能做什么"转向"理解本身"。同一思想的两种表达（普通咨询式 vs 接近 ASD-STE100）对照、因果链拆解、"应用 → 能力"双向图示、以及一个"应用数量 × 能力复用"交互实验；落点是"未来 AI 可以产生大量一次性的、定制的、用完即丢的认知工具"
- **替换文档：** AI 的下一步 · 从生成答案到生成理解工具 取代了早先的 `ai_understanding_asd_ste100.html` — 从"通用理解路径 + 自由输入模拟器"收敛为围绕"应用建设 → 能力建设"单一命题的完整论证

### 2026-08-13
- **新增文档：** E-Work · 你的 AI 同事 ([e-work-intro.html](e-work-intro.html)) — 集团内网 AI 智能助手使用手册。内容整合自 E-Work 项目三份源文件：SOUL.md（人格 + 协议底座）、quickstart（教学入口）、addoil（失败激活开关）

### 2026-07-27
- **移除文档：** 金控集团 · 审计条线 AI 应用规划 ([ai-audit.html](ai-audit.html)) — 内容已整合至其他文档
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
- **新增文档：** 金控集团 · 审计条线 AI 应用规划 ([ai-audit.html](ai-audit.html))

### 2026-06-18
- **架构更新：** 新增 AI 算力路由层作为共享模型网关
- **NanoBot 定位：** 定调为 Skills 服务平台，算力路由管底层模型调度
- **双路 LLM 调用理清：** 调 Skills 走 NanoBot，直接调模型走算力路由