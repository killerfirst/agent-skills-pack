#!/usr/bin/env node
// agent-skills-pack — Agent 技能一键启动包
//   aspack init             交互式选择
//   aspack init --pack=starter --target=claude-code  直接安装

import { existsSync, readFileSync, readdirSync, mkdirSync, cpSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKS_DIR = join(__dirname, '..', 'packs');
const SKILLS_SRC = 'E:/agent-skills-addy/skills';
const REPO_URL = 'https://github.com/addyosmani/agent-skills.git';

const PLATFORMS = [
  { id: 'claude-code', label: 'Claude Code' },
  { id: 'cursor',      label: 'Cursor' },
  { id: 'windsurf',    label: 'Windsurf' },
  { id: 'opencode',    label: 'OpenCode' },
  { id: 'gemini-cli',  label: 'Gemini CLI' },
  { id: 'copilot',     label: 'GitHub Copilot' },
  { id: 'kiro',        label: 'Kiro IDE' },
];

// ─── Platform Detection ────────────────────────────────────────

function detectPlatform(cwd) {
  const detectors = [
    { id: 'claude-code', check: () => existsSync(join(cwd, '.claude')) },
    { id: 'cursor',      check: () => existsSync(join(cwd, '.cursor')) || existsSync(join(cwd, '.cursorrules')) },
    { id: 'windsurf',    check: () => existsSync(join(cwd, '.windsurf')) },
    { id: 'opencode',    check: () => existsSync(join(cwd, '.opencode')) },
    { id: 'gemini-cli',  check: () => existsSync(join(cwd, 'GEMINI.md')) },
  ];

  for (const d of detectors) {
    if (d.check()) return PLATFORMS.find(p => p.id === d.id);
  }
  return null;
}

// ─── Pack Loading ──────────────────────────────────────────────

function listPacks() {
  try {
    return readdirSync(PACKS_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => {
        try {
          return JSON.parse(readFileSync(join(PACKS_DIR, f), 'utf-8'));
        } catch { return null; }
      })
      .filter(Boolean);
  } catch { return []; }
}

function getPack(name) {
  const path = join(PACKS_DIR, `${name}.json`);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf-8'));
}

// ─── Installers ────────────────────────────────────────────────

function installClaudeCode(pack) {
  const steps = [
    '\n  📦 Claude Code 安装步骤：',
    '',
    '  Step 1:  添加 skill 仓库',
    `    claude plugin marketplace add ${REPO_URL}`,
    '',
    '  Step 2:  安装所有 skills',
    '    claude plugin install agent-skills@addy-agent-skills',
  ];

  if (pack.quickstart?.length > 0) {
    steps.push('', '  Step 3:  在 Claude Code 中试试这些命令：');
    pack.quickstart.forEach(cmd => steps.push(`    ${cmd}`));
  }

  return steps.join('\n');
}

function installCursor(pack, cwd) {
  const rulesDir = join(cwd, '.cursor', 'rules');
  mkdirSync(rulesDir, { recursive: true });

  const packSkills = pack.skills || [];
  let count = 0;

  for (const skillName of packSkills) {
    const skillFile = join(SKILLS_SRC, skillName, 'SKILL.md');
    if (!existsSync(skillFile)) continue;

    const content = readFileSync(skillFile, 'utf-8');
    const metaMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    const body = metaMatch ? metaMatch[2].trim() : content;
    const desc = metaMatch
      ? (metaMatch[1].match(/description:\s*'([^']*)'|description:\s*"([^"]*)"|description:\s*(.+)/)?.[1] ?? '')
      : '';

    const mdcContent = `---
description: ${desc.trim()}
globs: 
---
${body}`;

    writeFileSync(join(rulesDir, `${skillName}.mdc`), mdcContent, 'utf-8');
    count++;
  }

  const steps = [
    `\n  ✅ 已安装 ${count} 个 skill 到 .cursor/rules/`,
    '',
    '  下一步：',
    '    · 重启 Cursor 生效',
    '    · 在 AI 对话框中输入：',
  ];

  if (pack.quickstart) {
    pack.quickstart.forEach(cmd => steps.push(`    ${cmd}`));
  }

  return steps.join('\n');
}

function installOpenCode(pack, cwd) {
  const installDir = join(cwd, '.opencode', 'skills');
  mkdirSync(installDir, { recursive: true });

  const packSkills = pack.skills || [];
  let count = 0;

  for (const skillName of packSkills) {
    const src = join(SKILLS_SRC, skillName, 'SKILL.md');
    const dst = join(installDir, `${skillName}.md`);
    if (existsSync(src)) {
      cpSync(src, dst);
      count++;
    }
  }

  const steps = [
    `\n  ✅ 已安装 ${count} 个 skill 到 .opencode/skills/`,
    '',
    '  OpenCode 会自动加载 skills/ 目录。',
  ];

  if (pack.quickstart?.length > 0) {
    steps.push('', '  试试这些命令：');
    pack.quickstart.forEach(cmd => steps.push(`    ${cmd}`));
  }

  return steps.join('\n');
}

function installGeminiCLI(pack, cwd) {
  const geminiFile = join(cwd, 'GEMINI.md');
  const packSkills = pack.skills || [];

  let existing = '';
  if (existsSync(geminiFile)) {
    existing = readFileSync(geminiFile, 'utf-8');
  }

  const skillLines = packSkills.map(s =>
    `- \`gemini skills install ${REPO_URL} --path skills/${s}\``
  );

  const section = `\n\n## Agent Skills Pack (${pack.name})\n\nInstall these skills:\n${skillLines.join('\n')}\n`;
  writeFileSync(geminiFile, existing + section, 'utf-8');

  const steps = [
    '\n  ✅ 已将安装指令追加到 GEMINI.md',
    '',
    '  运行安装：',
    `    gemini skills install ${REPO_URL} --path skills/`,
  ];

  return steps.join('\n');
}

function installGeneric(pack) {
  const skillList = pack.skills?.map(s => `  · ${s}`).join('\n') || '';

  return [
    '\n  ⚠️  未检测到可自动安装的 AI Agent 工具',
    '',
    '  手动安装方式：',
    '',
    '  Claude Code (推荐):',
    `    claude plugin marketplace add ${REPO_URL}`,
    '    claude plugin install agent-skills@addy-agent-skills',
    '',
    '  Cursor:',
    '    将 skills/ 下的 SKILL.md 复制到 .cursor/rules/',
    '',
    '  Gemini CLI:',
    `    gemini skills install ${REPO_URL} --path skills/`,
    '',
    '  推荐安装：' + pack.label,
    '  Skills:',
    skillList,
  ].join('\n');
}

// ─── Interactive ───────────────────────────────────────────────

function ask(query) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(query, a => { rl.close(); resolve(a.trim()); }));
}

async function pickPack(packs) {
  console.log('\n  可用的 Skill 包：\n');
  for (let i = 0; i < packs.length; i++) {
    const p = packs[i];
    console.log(`  [${i + 1}] ${p.label}`);
    console.log(`      ${p.description}`);
    console.log(`      → ${p.skills?.length || 0} 个 skills\n`);
  }

  const ans = await ask('  选哪个？输入编号: ');
  const idx = parseInt(ans) - 1;
  if (isNaN(idx) || idx < 0 || idx >= packs.length) {
    console.log('  ❌ 无效选择');
    return null;
  }
  return packs[idx];
}

// ─── Main ──────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === 'help' || cmd === '--help') {
    printHelp();
    return;
  }

  if (cmd === 'list' || cmd === 'ls') {
    printPacks();
    return;
  }

  if (cmd === 'init') {
    const getFlag = (prefix) => {
      const f = args.find(a => a.startsWith(prefix));
      return f ? f.split('=')[1] : null;
    };

    const packName = getFlag('--pack=');
    const targetId = getFlag('--target=');
    await runInit(packName, targetId);
    return;
  }

  printHelp();
}

async function runInit(packName, targetId) {
  const cwd = process.cwd();

  console.log('');
  console.log('  ╔══════════════════════════════════╗');
  console.log('  ║  🎯 Agent Skills Pack 一键安装  ║');
  console.log('  ╚══════════════════════════════════╝');
  console.log('');

  // Step 1: Pick pack
  let pack;
  if (packName) {
    pack = getPack(packName);
    if (!pack) {
      console.log(`  ❌ 未找到 pack "${packName}"`);
      const packs = listPacks();
      console.log('  可选: ' + packs.map(p => p.name).join(', '));
      return;
    }
    console.log(`  📋 Pack: ${pack.label}\n`);
  } else {
    const packs = listPacks();
    if (packs.length === 0) {
      console.log('  ❌ 没有可用的 pack');
      return;
    }
    pack = await pickPack(packs);
    if (!pack) return;
  }

  // Step 2: Platform
  let platform = null;

  if (targetId) {
    platform = PLATFORMS.find(p => p.id === targetId);
    if (!platform) {
      console.log(`  ❌ 未知平台: ${targetId}`);
      console.log('  支持: ' + PLATFORMS.map(p => p.id).join(', '));
      return;
    }
  } else {
    platform = detectPlatform(cwd);
  }

  if (platform) {
    console.log(`  🖥️  平台: ${platform.label}\n`);
  }

  // Step 3: Install
  let guide;
  if (!platform) {
    guide = installGeneric(pack);
  } else {
    switch (platform.id) {
      case 'claude-code': guide = installClaudeCode(pack); break;
      case 'cursor':      guide = installCursor(pack, cwd); break;
      case 'opencode':    guide = installOpenCode(pack, cwd); break;
      case 'gemini-cli':  guide = installGeminiCLI(pack, cwd); break;
      default:            guide = installGeneric(pack); break;
    }
  }

  console.log('\n  ───── 快速开始 ─────');
  console.log(guide);

  if (pack.tip) {
    console.log(`\n  💡 ${pack.tip}`);
  }

  console.log(`\n  📖 完整文档: ${REPO_URL}`);
  console.log('');
}

function printPacks() {
  const packs = listPacks();
  console.log('');
  for (const p of packs) {
    const n = p.skills?.length || 0;
    console.log(`  ${p.name.padEnd(14)} ${n} skills  — ${p.description.slice(0, 50)}...`);
  }
  console.log('');
}

function printHelp() {
  console.log('');
  console.log('  🎯 agent-skills-pack — Agent 技能一键启动包');
  console.log('');
  console.log('  用法:');
  console.log('    aspack                   查看可用 packs');
  console.log('    aspack init              交互式安装');
  console.log('    aspack init --pack=web-dev');
  console.log('    aspack init --pack=starter --target=cursor');
  console.log('');
  printPacks();
}

await main();
