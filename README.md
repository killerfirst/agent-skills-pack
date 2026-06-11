<div align="center">

# 🎯 Agent Skills Pack

**AI 编码 Agent 技能 — 一键安装 · 零门槛 · 开箱即用**

<a href="#"><img src="https://img.shields.io/badge/version-0.1.0-blue.svg" alt="version"></a>
<a href="https://addyosmani.com/agent-skills"><img src="https://img.shields.io/badge/powered%20by-addyosmani/agent--skills-orange" alt="powered by"></a>
<a href="#"><img src="https://img.shields.io/badge/license-MIT-green" alt="license"></a>

**English** · [中文](./README.zh.md)

</div>

---

## What is this？

[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) has 24 production-grade skills for AI coding agents. But if you're new:

- Which ones should you install?
- How to set them up for your agent (Claude Code / Cursor / Windsurf / OpenCode)?
- What do you do AFTER installation?

**Agent Skills Pack** solves all three. One command → pick a curated pack → auto-install → get a quick-start guide.

## Quick Start

```bash
npx agent-skills-pack init
```

That's it. Interactive mode walks you through the rest.

Or, if you know what you want:

```bash
# Install the web-dev pack for Cursor
npx agent-skills-pack init --pack=web-dev --target=cursor

# Install the starter pack (no platform detection needed, just prints guide)
npx agent-skills-pack init --pack=starter
```

## Available Packs

| Pack | Skills | Best for |
|------|--------|----------|
| 🚀 **starter** | 6 | First time using AI coding agents |
| 🌐 **web-dev** | 7 | Full-stack / frontend developers |
| 🧠 **python-ai** | 7 | Data science, ML, AI app developers |
| 🔒 **security** | 5 | Security audits, production gates |

### 🚀 Starter Pack

Perfect for beginners. Covers the complete engineering lifecycle.

**Skills:** Spec-driven dev → Planning → Incremental build → TDD → Code review → Git workflow

```bash
npx agent-skills-pack init --pack=starter
# After install, try:
#   /spec → write requirements
#   /plan → break tasks
#   /build → implement
#   /test → write tests
#   /review → code review
```

### 🌐 Web Dev Pack

Frontend + API + performance. For full-stack web developers.

**Skills:** UI engineering, API design, performance optimization, browser testing, TDD, code review, shipping

```bash
npx agent-skills-pack init --pack=web-dev
```

### 🧠 Python / AI Pack

Data science and ML development. Rigor and reproducibility.

**Skills:** Spec-driven dev, source-driven dev, TDD, debugging, code review, documentation, performance

```bash
npx agent-skills-pack init --pack=python-ai
```

### 🔒 Security Pack

Code security audits and production hardening.

**Skills:** Security hardening, code review, dependency migration, TDD, observability

```bash
npx agent-skills-pack init --pack=security
```

## Supported Platforms

| Platform | Install Method |
|----------|---------------|
| **Claude Code** (recommended) | Auto-detected, prints marketplace commands |
| **Cursor** | Auto-detected, copies skills to `.cursor/rules/` |
| **OpenCode** | Auto-detected, copies skills to `.opencode/skills/` |
| **Gemini CLI** | Auto-detected, appends to `GEMINI.md` |
| **Windsurf / Copilot / Kiro** | Prints manual instructions |

## CLI Reference

```bash
# List available packs
npx agent-skills-pack list
# alias
npx agent-skills-pack ls

# Interactive install (pick pack, auto-detect platform)
npx agent-skills-pack init

# Direct install
npx agent-skills-pack init --pack=python-ai
npx agent-skills-pack init --pack=web-dev --target=cursor

# Help
npx agent-skills-pack help
```

### Options

| Flag | Values | Description |
|------|--------|-------------|
| `--pack=` | starter, web-dev, python-ai, security | Skill pack to install |
| `--target=` | claude-code, cursor, opencode, gemini-cli | Override platform detection |

## Why Use This?

**Plain addyosmani/agent-skills:**
- 24 skills — figure it out yourself
- 8 platforms — 8 sets of install docs
- Installed? Great, now go read the docs again

**With Agent Skills Pack:**
- Pick a pack (or let us recommend one)
- One command auto-installs for your platform
- See exactly which commands to run first

> **"I don't know what I don't know"** — that's the problem this solves.

## Why We Built This

We're building the missing layer between open-source AI agent skills and real people who want to use them.

Addy Osmani's skills are excellent content. But content needs a delivery experience. That's what we do: **curation + installation + onboarding**, all in one shot.

Think of it as the **Homebrew for Agent Skills**.

## Roadmap

- [x] MVP: 4 packs + CLI installer (Cursor, Claude Code, OpenCode, Gemini CLI)
- [ ] Publish to npm
- [ ] GitHub release
- [ ] More packs (data-engineering, devops, mobile, game-dev)
- [ ] Multi-source (phuryn/pm-skills, community packs)
- [ ] Visual pack builder
- [ ] Team sync

## Development

```bash
git clone https://github.com/wei/agent-skills-pack
cd agent-skills-pack
node bin/cli.js list
```

## License

MIT

---

*Built with ❤️ for developers who want to ship better code, faster.*
