# 🎯 Agent Skills Pack

**AI 编码 Agent 技能 — 一键安装。零门槛。**

[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) 提供了 24 个生产级工程 skill，但对新手来说：
- 该装哪个？
- 怎么装到我的 Agent 上？
- 装完怎么用？

Agent Skills Pack 帮你解决这三个问题。

## 快速开始

```bash
npx agent-skills-pack init
```

交互式选择 Skill 包 → 自动检测 Agent 平台 → 一键安装 → 显示快速开始指南。

## 支持的 Skill 包

| 包名 | Skills 数 | 适合谁 |
|------|-----------|--------|
| `starter` | 6 | 刚开始用 AI 编码 Agent 的新手 |
| `web-dev` | 7 | 全栈/前端开发者 |
| `python-ai` | 7 | 数据科学 / AI 开发 |
| `security` | 5 | 安全工程、生产前审查 |

## 支持的平台

- **Claude Code** — 最佳体验，自动通过 plugin marketplace 安装
- **Cursor** — 自动复制到 `.cursor/rules/`
- **OpenCode** — 自动复制到 `.opencode/skills/`
- **Gemini CLI** — 追加安装指令到 `GEMINI.md`
- **Windsurf / Copilot / Kiro** — 打印手动安装指引

## 用法

```bash
# 查看可用包
npx agent-skills-pack list

# 交互式安装
npx agent-skills-pack init

# 直接安装指定包和平台
npx agent-skills-pack init --pack=web-dev --target=cursor

# 显示帮助
npx agent-skills-pack help
```

## Skill 包说明

### 🚀 starter — 新手入门包

包含：spec → plan → implement → test → review → git

适合：第一次用 Claude Code / Cursor 写代码的人。

### 🌐 web-dev — 网页开发包

包含：前端工程、API 设计、性能优化、浏览器测试、TDD、代码审查、部署

适合：全栈开发者，前端 + API + 性能一站式。

### 🧠 python-ai — Python/AI 开发包

包含：需求文档、源码驱动、TDD、调试恢复、代码审查、文档管理、性能优化

适合：数据科学、ML 训练、AI 应用开发。

### 🔒 security — 安全工程包

包含：安全加固、代码审查、废弃迁移、TDD、可观测性

适合：安全审计、上生产前的质量门。

## 开发

```bash
git clone https://github.com/wei/agent-skills-pack
cd agent-skills-pack
node bin/cli.js list
```

## License

MIT
