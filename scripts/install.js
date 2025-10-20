#!/usr/bin/env node

/**
 * Waddle Skills - Multi-Skill Installation Script
 * Installs one or more Claude Code skills from this repository
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
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
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

function loadSkillsManifest() {
  const manifestPath = path.join(__dirname, '..', 'skills.json');

  if (!fs.existsSync(manifestPath)) {
    log('⚠️  skills.json manifest not found. This might be a development install.', 'yellow');
    return null;
  }

  try {
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    return JSON.parse(manifestContent);
  } catch (error) {
    log(`❌ Error reading skills.json: ${error.message}`, 'red');
    return null;
  }
}

function installSkill(skillInfo, projectRoot, packageRoot) {
  const skillsDir = path.join(projectRoot, '.claude', 'skills');
  const sourceFile = path.join(packageRoot, skillInfo.skillFile);
  const targetFile = path.join(skillsDir, `${skillInfo.id}.md`);

  // Check if source file exists
  if (!fs.existsSync(sourceFile)) {
    log(`⚠️  Skill file not found: ${skillInfo.skillFile}`, 'yellow');
    return false;
  }

  // Create .claude/skills directory if it doesn't exist
  if (!fs.existsSync(skillsDir)) {
    fs.mkdirSync(skillsDir, { recursive: true });
  }

  // Check if skill already exists
  if (fs.existsSync(targetFile)) {
    log(`  ⚠️  ${skillInfo.name} already exists. Updating...`, 'yellow');
  }

  // Copy the skill file
  fs.copyFileSync(sourceFile, targetFile);

  return true;
}

function displaySkillInfo(skill) {
  log(`  📝 ${skill.name} v${skill.version}`, 'cyan');
  log(`     ${skill.description}`, 'reset');
  log(`     Command: ${skill.installCommand}`, 'blue');
  log(`     Category: ${skill.category} | Status: ${skill.status}`, 'reset');
}

function installAllSkills() {
  try {
    log('╔════════════════════════════════════════════════════════════╗', 'cyan');
    log('║         Waddle Skills - Multi-Skill Installer              ║', 'cyan');
    log('╚════════════════════════════════════════════════════════════╝', 'cyan');
    log('');

    const projectRoot = findProjectRoot();
    const packageRoot = path.join(__dirname, '..');
    const manifest = loadSkillsManifest();

    if (!manifest) {
      log('❌ Cannot proceed without skills manifest', 'red');
      process.exit(1);
    }

    log(`📦 Found ${manifest.skills.length} skill(s) in repository`, 'cyan');
    log('');

    // Parse command line arguments
    const args = process.argv.slice(2);
    const installAll = args.length === 0 || args.includes('--all');
    const skillsToInstall = installAll
      ? manifest.skills
      : manifest.skills.filter(skill => args.includes(skill.id));

    if (skillsToInstall.length === 0) {
      log('❌ No matching skills found', 'red');
      log('');
      log('Available skills:', 'cyan');
      manifest.skills.forEach(skill => {
        log(`  - ${skill.id}`, 'yellow');
      });
      log('');
      log('Usage:', 'cyan');
      log('  node install.js              # Install all skills', 'reset');
      log('  node install.js skill1 skill2  # Install specific skills', 'reset');
      process.exit(1);
    }

    log('Installing skills:', 'cyan');
    log('');

    let successCount = 0;
    let failCount = 0;

    skillsToInstall.forEach(skill => {
      displaySkillInfo(skill);

      if (installSkill(skill, projectRoot, packageRoot)) {
        log('  ✓ Installed successfully', 'green');
        successCount++;
      } else {
        log('  ✗ Installation failed', 'red');
        failCount++;
      }
      log('');
    });

    // Summary
    log('═'.repeat(60), 'cyan');
    log(`✓ Successfully installed: ${successCount}`, 'green');
    if (failCount > 0) {
      log(`✗ Failed: ${failCount}`, 'red');
    }
    log('');
    log(`📍 Location: ${path.join(projectRoot, '.claude', 'skills')}`, 'cyan');
    log('');
    log('🚀 Usage in Claude Code:', 'cyan');
    skillsToInstall.forEach(skill => {
      log(`   ${skill.installCommand}`, 'blue');
    });
    log('');
    log('📚 Documentation:', 'cyan');
    log(`   ${manifest.repository}`, 'blue');
    log('');
    log('✨ Installation complete!', 'green');

  } catch (error) {
    log('❌ Error during installation:', 'red');
    log(error.message, 'red');
    log('');
    log('Please try manual installation:', 'yellow');
    log('1. Create directory: mkdir -p .claude/skills', 'yellow');
    log('2. Copy skill files to .claude/skills/', 'yellow');
    process.exit(1);
  }
}

// Only run if this is being executed directly (not required as a module)
if (require.main === module) {
  installAllSkills();
}

module.exports = { installAllSkills, installSkill, loadSkillsManifest };
