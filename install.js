#!/usr/bin/env node

/**
 * Shadcn Form Generator - NPM Installation Script
 * This script runs after `npm install` to copy the skill to your project
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function findProjectRoot() {
  let currentDir = process.cwd();

  // Try to find project root by looking for common markers
  while (currentDir !== path.parse(currentDir).root) {
    if (
      fs.existsSync(path.join(currentDir, 'package.json')) ||
      fs.existsSync(path.join(currentDir, '.git'))
    ) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }

  // If not found, use current directory
  return process.cwd();
}

function installSkill() {
  try {
    log('╔════════════════════════════════════════════════════════════╗', 'cyan');
    log('║   Shadcn Form Generator - Claude Code Skill Installer     ║', 'cyan');
    log('╚════════════════════════════════════════════════════════════╝', 'cyan');
    log('');

    const projectRoot = findProjectRoot();
    const skillsDir = path.join(projectRoot, '.claude', 'skills');
    const sourceFile = path.join(__dirname, 'shadcn-form-generator.md');
    const targetFile = path.join(skillsDir, 'shadcn-form-generator.md');

    // Check if source file exists
    if (!fs.existsSync(sourceFile)) {
      log('⚠️  Skill file not found in package. This might be a development install.', 'yellow');
      return;
    }

    // Create .claude/skills directory if it doesn't exist
    if (!fs.existsSync(skillsDir)) {
      log('📁 Creating .claude/skills directory...', 'cyan');
      fs.mkdirSync(skillsDir, { recursive: true });
    }

    // Check if skill already exists
    if (fs.existsSync(targetFile)) {
      log('⚠️  Skill already exists. Updating...', 'yellow');
    }

    // Copy the skill file
    log('📥 Installing skill file...', 'cyan');
    fs.copyFileSync(sourceFile, targetFile);

    log('✓ Skill installed successfully!', 'green');
    log('');
    log(`📍 Location: ${targetFile}`, 'cyan');
    log('');
    log('🚀 Usage:', 'cyan');
    log('   Run in Claude Code: /shadcn-form-generator');
    log('');
    log('📚 Documentation:', 'cyan');
    log('   https://github.com/YOUR_USERNAME/claude-shadcn-form-generator');
    log('');
    log('✨ Installation complete!', 'green');

  } catch (error) {
    log('❌ Error during installation:', 'red');
    log(error.message, 'red');
    log('');
    log('Please try manual installation:', 'yellow');
    log('1. Create directory: mkdir -p .claude/skills', 'yellow');
    log('2. Copy skill file to .claude/skills/shadcn-form-generator.md', 'yellow');
    process.exit(1);
  }
}

// Only run if this is being executed directly (not required as a module)
if (require.main === module) {
  installSkill();
}

module.exports = { installSkill };
