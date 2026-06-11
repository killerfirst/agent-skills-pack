<div align="center">

# 🎯 Agent Skills Pack

**AI 编码 Agent 技能 — 一键安装 · 零门槛 · 开箱即用**

<a href="#"><img src="https://img.shields.io/badge/version-0.1.0-blue.svg" alt="版本"></a>
<a href="https://addyosmani.com/agent-skills"><img src="https://img.shields.io/badge/powered%20by-addyosmani/agent--skills-orange" alt="基于"></a>
<a href="#"><img src="https://img.shields.io/badge/license-MIT-green" alt="协议"></a>

[English](./README.md) · **中文**

</div>

---

## 这是什么？

[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) 提供了 24 个生产级 AI 编码 Agent skill。但对新手来说：

- 24 个 skill，该装哪个？
- 怎么装到我的 Agent 上（Claude Code / Cursor / Windsurf / OpenCode）？
- 装完了然后呢？怎么用？

**Agent Skills Pack 一次性解决这三个问题** — 选包 → 装 → 告诉你怎么用，全过程一条命令。

## 快速开始

```bash
npx agent-skills-pack init
```

交互式选择，自动安装，自动出快速指南。

如果你已经知道自己要什么：

```bash
# 给 Cursor 装 web 开发包
npx agent-skills-pack init --pack=web-dev --target=cursor

# 只选包（自动检测平台）
npx agent-skills-pack init --pack=starter
```

## 可用 Skill 包

| 包名 | Skill 数 | 适合谁 |
|------|----------|--------|
| 🚀 **starter** | 6 | 第一次用 AI 编码 Agent |
| 🌐 **web-dev** | 7 | 全栈 / 前端开发者 |
| 🧠 **python-ai** | 7 | 数据科学 / AI 开发 |
| 🔒 **security** | 5 | 安全审计 / 生产审查 |

### 🚀 新手入门包

覆盖完整的工程流程。从写需求文档到提交代码，一条龙。

**Skills:** 需求驱动 → 规划拆解 → 增量实现 → 测试驱动 → 代码审查 → Git 工作流

```bash
npx agent-skills-pack init --pack=starter
# 装完在 AI 对话框中试试：
#   /spec   → 写需求文档
#   /plan   → 拆任务
#   /build  → 自动实现
#   /test   → 写测试
#   /review → 代码审查
```

### 🌐 网页开发包

前端 + API + 性能优化，全栈一站搞定。

**Skills:** UI 工程、API 设计、性能优化、浏览器测试、TDD、代码审查、部署上线

```bash
npx agent-skills-pack init --pack=web-dev
```

### 🧠 Python / AI 开发包

数据科学和 AI 开发专用。注重代码严谨性和可复现性。

**Skills:** 需求驱动、源码驱动、TDD、调试恢复、代码审查、文档管理、性能优化

```bash
npx agent-skills-pack init --pack=python-ai
```

### 🔒 安全工程包

代码安全审计和生产加固。

**Skills:** 安全加固、代码审查、废弃依赖迁移、TDD、可观测性

```bash
npx agent-skills-pack init --pack=security
```

## 支持的平台

| 平台 | 安装方式 |
|------|----------|
| **Claude Code** (推荐) | 自动检测，打印 marketplace 命令 |
| **Cursor** | 自动检测，复制 skill 到 `.cursor/rules/` |
| **OpenCode** | 自动检测，复制 skill 到 `.opencode/skills/` |
| **Gemini CLI** | 自动检测，追加到 `GEMINI.md` |
| **Windsurf / Copilot / Kiro** | 打印手动安装指引 |

## CLI 用法

```bash
# 查看可用包
npx agent-skills-pack list

# 交互式安装
npx agent-skills-pack init

# 直装（指定包 + 平台）
npx agent-skills-pack init --pack=web-dev --target=cursor

# 帮助
npx agent-skills-pack help
```

### 参数

| 参数 | 可选值 | 说明 |
|------|--------|------|
| `--pack=` | starter, web-dev, python-ai, security | 指定 skill 包 |
| `--target=` | claude-code, cursor, opencode, gemini-cli | 指定目标平台 |

## 为什么用这个？

**直接使用 addyosmani/agent-skills：**
- 24 个 skill — 自己研究装哪些
- 8 个平台 — 自己翻 8 份文档
- 装好了？好，再去读文档学怎么用

**用 Agent Skills Pack：**
- 选个包（或者让我们推荐）
- 一条命令自动装到你的平台
- 装完直接告诉你先打什么命令

## 为什么做这个

我们在构建「开源 Agent skill 和真实用户之间的缺失层」。

Addy Osmani 的 skills 是优秀的内容。但内容需要交付体验。我们的工作就是：**精选 + 安装 + 上手引导**，一条命令打包。

可以理解为 **Agent Skills 界的 Homebrew**。

## 路线图

- [x] MVP：4 个 pack + CLI 安装器（Cursor、Claude Code、OpenCode、Gemini CLI）
- [ ] 发布到 npm
- [ ] GitHub Release
- [ ] 更多 pack（数据工程、DevOps、移动端、游戏开发）
- [ ] 多源支持（phuryn/pm-skills、社区 packs）
- [ ] 可视化 Pack 构建器
- [ ] 团队同步

## 开发

```bash
git clone https://github.com/wei/agent-skills-pack
cd agent-skills-pack
node bin/cli.js list
```

## License

MIT

---

*为每一个想更快写出好代码的开发者打造。*
