# Waddle Skills - Claude Code Skills Collection

A curated collection of production-ready Claude Code skills to supercharge your development workflow.

## Overview

Waddle Skills is an open-source repository of Claude Code skills that help you generate code faster, maintain consistency, and follow best practices. Each skill is carefully crafted to solve specific development challenges with high-quality, type-safe code generation.

## Installation 
/plugin marketplace add https://github.com/voxuanthuan/waddle-skill

## Available Skills

### 1. Form Skill
**Category**: Frontend | **Status**: Stable | **Version**: 1.0.0

Generate production-ready React forms with shadcn/ui, React Hook Form, and Yup validation.

## Repository Structure

```
waddle-skills/
├── skills/                    # Skill definitions (core content)
│   └── [skill-name]/
│       ├── skill.md          # The actual skill prompt (main deliverable)
│       ├── README.md         # Documentation for users
│       └── examples/         # Working code examples
|
├── package.json
├── README.md                 # This file
├── CLAUDE.md                 # Project instructions for Claude Code
```

### Key Components

- **skills/** - Contains all skill definitions. Each skill has its own directory with:
  - `skill.md` - The prompt that instructs Claude Code (most important file)
  - `README.md` - User documentation with examples and usage
  - `examples/` - Working code examples demonstrating the skill's output

- **scripts/** - Installation tooling for deploying skills to Claude Code
  - `install.js` - Main installer supporting single or multiple skill installation
  - `install.sh` - Shell-based installer for remote installation

- **templates/** - Starter templates for creating new skills

- **skills.json** - Central registry listing all available skills with metadata


## Contributing

We welcome contributions! Here's how:

Made with ❤️ for the Claude Code Community

