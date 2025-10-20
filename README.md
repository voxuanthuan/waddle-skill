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
│   └── form-skill/
│       ├── skill.md          # The actual skill prompt (main deliverable)
│       ├── README.md         # Documentation for users
│       └── examples/         # Working code examples
│           ├── contact-form.tsx
│           └── product-form.tsx
├── templates/                 # Templates for creating new skills
│   ├── skill-template.md
│   └── README-template.md
├── docs/                     # Documentation and guides
│   └── CREATING_SKILLS.md
├── .claude-plugin/           # Claude Code marketplace configuration
│   └── marketplace.json
├── package.json
├── README.md                 # This file
├── CLAUDE.md                 # Project instructions for Claude Code
├── LICENSE
└── .gitignore
```

### Key Components

- **skills/** - Contains all skill definitions. Each skill has its own directory with:
  - `skill.md` - The prompt that instructs Claude Code (most important file)
  - `README.md` - User documentation with examples and usage
  - `examples/` - Working code examples demonstrating the skill's output

- **.claude-plugin/** - Claude Code marketplace integration
  - `marketplace.json` - Plugin registry for marketplace distribution

- **templates/** - Starter templates for creating new skills

- **docs/** - Documentation for contributors and users


## Contributing

We welcome contributions! Here's how:

Made with ❤️ for the Claude Code Community

