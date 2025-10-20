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

**Features**:
- Type-safe forms with TypeScript
- 10+ field types (text, currency, date, select, etc.)
- Built-in validation and error handling
- Apollo Client integration
- Accessibility built-in

**Command**: `/form-skill`



## For Teams & Organizations

Setting this up for your team? We've got you covered:

- **[Installation Guide](docs/INSTALLATION.md)** - 9 different installation methods
- **[Team Distribution Guide](docs/TEAM_GUIDE.md)** - Share with coworkers easily
- **[Marketplace Setup](docs/MARKETPLACE.md)** - Create your own skill marketplace
- **[Creating Skills Guide](docs/CREATING_SKILLS.md)** - Add your own skills

## Usage

After installation, skills are immediately available in Claude Code:

```
/form-skill
```

Each skill will:
1. Ask you for required information
2. Generate production-ready code
3. Follow best practices automatically
4. Include proper error handling and types

## Repository Structure

```
waddle-skills/
├── skills/                       # All skill definitions
│   ├── form-skill/
│   │   ├── skill.md             # Skill prompt
│   │   ├── README.md            # Documentation
│   │   └── examples/            # Working examples
│   └── [more-skills]/
|
├── skills.json                   # Skills registry
├── package.json
├── README.md                     # This file
└── LICENSE
```

## Skills by Category

### Frontend
- [Form Skill](skills/form-skill/) - React forms with shadcn/ui


2. **Edit the skill prompt**: `skills/your-skill-name/skill.md`

3. **Add examples**: Create working examples in `examples/`

4. **Register in skills.json**: Add your skill metadata

5. **Test locally**: Copy to `.claude/skills/` and test

6. **Submit a PR**: Share with the community!

See the [Creating Skills Guide](docs/CREATING_SKILLS.md) for detailed instructions.

## Skills Manifest

All skills are registered in `skills.json`:

```json
{
  "id": "skill-id",
  "name": "Skill Name",
  "description": "What it does",
  "version": "1.0.0",
  "category": "frontend|backend|fullstack|devops|testing",
  "status": "stable|beta|experimental",
  "installCommand": "/skill-command"
}
```

## Contributing

We welcome contributions! Here's how:

Made with ❤️ for the Claude Code

