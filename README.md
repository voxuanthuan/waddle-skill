# Waddle Skills - Claude Code Skills Collection

A curated collection of production-ready Claude Code skills to supercharge your development workflow.

## Overview

Waddle Skills is an open-source repository of Claude Code skills that help you generate code faster, maintain consistency, and follow best practices. Each skill is carefully crafted to solve specific development challenges with high-quality, type-safe code generation.

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

[📖 Full Documentation](skills/form-skill/README.md)

---

### Coming Soon
- API Client Generator
- Component Story Generator
- E2E Test Generator
- And more...

Want to contribute a skill? See [Creating Skills Guide](docs/CREATING_SKILLS.md)

## Installation

### Quick Install (Recommended)

Install all skills with one command:

```bash
# Using curl
curl -fsSL https://raw.githubusercontent.com/voxuanthuan/waddle-skill/main/scripts/install.sh | bash

# Or using npm
npm install --save-dev waddle-skills
npx waddle-skills-install
```

### Install Specific Skills

```bash
# Clone the repository
git clone https://github.com/voxuanthuan/waddle-skill.git
cd waddle-skill

# Install specific skills
node scripts/install.js form-skill

# Or install all
node scripts/install.js --all
```

### Manual Installation

```bash
# Create skills directory
mkdir -p .claude/skills

# Download specific skill
curl -o .claude/skills/form-skill.md \
  https://raw.githubusercontent.com/voxuanthuan/waddle-skill/main/skills/form-skill/skill.md
```

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
├── scripts/                      # Installation scripts
│   ├── install.js               # Node.js installer
│   └── install.sh               # Shell installer
├── templates/                    # Skill creation templates
│   ├── skill-template.md
│   └── README-template.md
├── docs/                         # Documentation
│   ├── INSTALLATION.md
│   ├── CREATING_SKILLS.md
│   ├── TEAM_GUIDE.md
│   └── MARKETPLACE.md
├── skills.json                   # Skills registry
├── package.json
├── README.md                     # This file
└── LICENSE
```

## Skills by Category

### Frontend
- [Form Skill](skills/form-skill/) - React forms with shadcn/ui

### Backend
- *Coming soon*

### Full-Stack
- *Coming soon*

### DevOps
- *Coming soon*

### Testing
- *Coming soon*

## Creating Your Own Skills

Want to add a new skill? It's easy!

1. **Copy the template**:
   ```bash
   cp -r templates/ skills/your-skill-name/
   ```

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

### Adding Skills
1. Fork the repository
2. Create a new skill following our [Creating Skills Guide](docs/CREATING_SKILLS.md)
3. Add examples and documentation
4. Register in `skills.json`
5. Submit a Pull Request

### Improving Existing Skills
1. Test the skill thoroughly
2. Identify improvement areas
3. Make changes with clear reasoning
4. Update version number
5. Submit a Pull Request

### Reporting Issues
- Use GitHub Issues
- Include skill name and version
- Provide example input/output
- Describe expected vs actual behavior

## Best Practices

All skills in this repository follow these principles:

1. **Type Safety**: Full TypeScript support
2. **Modern Patterns**: Current best practices
3. **Error Handling**: Comprehensive error handling
4. **Accessibility**: WCAG compliance where applicable
5. **Performance**: Optimized patterns
6. **Security**: Secure code generation
7. **Documentation**: Clear, comprehensive docs
8. **Examples**: Working, real-world examples

## Requirements

- [Claude Code](https://claude.com/claude-code) installed
- Project-specific dependencies (varies by skill)

## Version History

### v1.0.0 (2025-10-20)
- Initial release
- Form Skill (shadcn/ui form generator)
- Multi-skill infrastructure
- Installation scripts
- Documentation suite
- Skill creation templates

## Roadmap

- [ ] Additional form components (multi-step, wizard)
- [ ] API client generator
- [ ] Component story generator (Storybook)
- [ ] E2E test generator (Playwright/Cypress)
- [ ] Database migration generator
- [ ] GraphQL schema generator
- [ ] CLI tool generator
- [ ] Docker compose generator
- [ ] CI/CD pipeline generator
- [ ] Documentation generator

Vote for features or suggest new skills in [GitHub Discussions](https://github.com/voxuanthuan/waddle-skill/discussions)!

## Community

- **GitHub**: [voxuanthuan/waddle-skill](https://github.com/voxuanthuan/waddle-skill)
- **Issues**: [Report bugs or request features](https://github.com/voxuanthuan/waddle-skill/issues)
- **Discussions**: [Ask questions, share ideas](https://github.com/voxuanthuan/waddle-skill/discussions)
- **Twitter**: [@voxuanthuan](https://twitter.com/voxuanthuan) (if applicable)

## FAQ

### How do I update skills?
Run the installation script again - it will update existing skills.

### Can I modify skills after installation?
Yes! Skills are just markdown files in `.claude/skills/`. Edit as needed.

### How do I uninstall a skill?
Delete the skill file from `.claude/skills/`.

### Can I use these skills commercially?
Yes! All skills are MIT licensed.

### How do I create a private skill for my team?
See the [Team Distribution Guide](docs/TEAM_GUIDE.md).

## Support

- 📖 [Documentation](docs/)
- 🐛 [Report Issues](https://github.com/voxuanthuan/waddle-skill/issues)
- 💬 [Discussions](https://github.com/voxuanthuan/waddle-skill/discussions)
- 📧 Email: [your-email] (optional)

## Acknowledgments

- Built for [Claude Code](https://claude.com/claude-code)
- Inspired by the Claude Code community
- Special thanks to all contributors

## License

MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ for the Claude Code community

**Star this repo if you find it useful!** ⭐
