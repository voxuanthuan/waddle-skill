# Migration Guide: Single Skill → Multi-Skill Repository

This document explains what changed when the repository was restructured to support multiple Claude Code skills.

## What Changed

### Repository Name
- **Old**: `waddle-skill` (single skill)
- **New**: `waddle-skills` (multiple skills collection)

### Package Name
- **Old**: `claude-shadcn-form-generator`
- **New**: `waddle-skills`

### Directory Structure

#### Before (v0.x)
```
waddle-skill/
├── shadcn-form-generator.md  # Skill file
├── examples/
│   ├── contact-form.tsx
│   └── product-form.tsx
├── install.js
├── install.sh
├── INSTALLATION.md
├── TEAM_GUIDE.md
├── MARKETPLACE.md
├── README.md
├── package.json
└── LICENSE
```

#### After (v1.0)
```
waddle-skills/
├── skills/                         # NEW: All skills organized here
│   └── shadcn-form-generator/
│       ├── skill.md               # Renamed from shadcn-form-generator.md
│       ├── README.md              # NEW: Skill-specific docs
│       └── examples/              # Moved from root
│           ├── contact-form.tsx
│           └── product-form.tsx
├── scripts/                        # NEW: All scripts organized here
│   ├── install.js                 # Updated for multi-skill support
│   └── install.sh                 # Updated for multi-skill support
├── templates/                      # NEW: Templates for creating skills
│   ├── skill-template.md
│   └── README-template.md
├── docs/                           # NEW: All documentation organized here
│   ├── INSTALLATION.md            # Moved from root
│   ├── TEAM_GUIDE.md              # Moved from root
│   ├── MARKETPLACE.md             # Moved from root
│   └── CREATING_SKILLS.md         # NEW: Guide for adding skills
├── skills.json                     # NEW: Skills registry/manifest
├── package.json                    # Updated for multi-skill distribution
├── README.md                       # Rewritten for multi-skill repo
└── LICENSE
```

## For End Users

### If You Installed via NPM
```bash
# Old method (still works if package name doesn't change on npm)
npm install --save-dev claude-shadcn-form-generator

# New method (when published)
npm install --save-dev waddle-skills
```

### If You Installed via curl
```bash
# Old URL
curl -o .claude/skills/shadcn-form-generator.md \
  https://raw.githubusercontent.com/voxuanthuan/waddle-skill/main/shadcn-form-generator.md

# New URL
curl -o .claude/skills/shadcn-form-generator.md \
  https://raw.githubusercontent.com/voxuanthuan/waddle-skill/main/skills/shadcn-form-generator/skill.md
```

### No Action Needed
If you already have the skill installed in `.claude/skills/`, **it will continue to work**. Skills are just markdown files - the repository structure doesn't affect installed skills.

### To Update
Run the installation script again to get the latest version:
```bash
curl -fsSL https://raw.githubusercontent.com/voxuanthuan/waddle-skill/main/scripts/install.sh | bash
```

## For Contributors

### Adding New Skills
Instead of creating separate repositories for each skill, you can now add skills to this repository:

1. **Create skill directory**:
   ```bash
   mkdir -p skills/your-skill-name/examples
   ```

2. **Copy templates**:
   ```bash
   cp templates/skill-template.md skills/your-skill-name/skill.md
   cp templates/README-template.md skills/your-skill-name/README.md
   ```

3. **Edit your skill**: Fill in the templates

4. **Register in skills.json**:
   ```json
   {
     "id": "your-skill-name",
     "name": "Your Skill Name",
     "description": "What it does",
     "version": "1.0.0",
     "skillFile": "skills/your-skill-name/skill.md",
     ...
   }
   ```

5. **Submit PR**: One PR adds your skill to the collection!

See [CREATING_SKILLS.md](docs/CREATING_SKILLS.md) for full guide.

## Breaking Changes

### None for End Users
- Existing installations continue to work
- The `/shadcn-form-generator` command is unchanged
- Generated code is identical

### For Package Consumers
If you were importing or requiring this package programmatically (unlikely for skills), note:

- **Old**: `require('claude-shadcn-form-generator')`
- **New**: `require('waddle-skills')`

## New Features

### Skills Manifest
`skills.json` now tracks all skills with:
- Metadata (name, version, description)
- Categories and tags
- Dependencies
- Status (stable, beta, experimental)
- Examples and documentation paths

### Selective Installation
```bash
# Install all skills
node scripts/install.js --all

# Install specific skills
node scripts/install.js shadcn-form-generator another-skill
```

### Skill Templates
Templates in `templates/` make it easy to create new skills following the established patterns.

### Comprehensive Documentation
- [CREATING_SKILLS.md](docs/CREATING_SKILLS.md) - Guide for skill authors
- [INSTALLATION.md](docs/INSTALLATION.md) - Installation methods
- [TEAM_GUIDE.md](docs/TEAM_GUIDE.md) - Team distribution
- [MARKETPLACE.md](docs/MARKETPLACE.md) - Marketplace setup

## Timeline

- **v0.x (Before)**: Single-skill repository
- **v1.0.0 (Now)**: Multi-skill repository with:
  - Organized directory structure
  - Skills manifest system
  - Templates and creation guide
  - Updated installation scripts
  - Comprehensive documentation

## Backward Compatibility

### Maintained
✅ Existing skill files in `.claude/skills/` work as-is
✅ Skill invocation command unchanged (`/shadcn-form-generator`)
✅ Generated code format unchanged
✅ GitHub repository URL unchanged
✅ Examples and documentation content preserved

### Updated
⚠️ File paths within repository changed (for contributors)
⚠️ Package name changed (when published to npm)
⚠️ Installation scripts enhanced with new features

## FAQ

### Do I need to reinstall?
No. If your skill is working, you don't need to do anything. Reinstalling will give you the latest version.

### Will old bookmarks/links work?
Raw GitHub URLs to old locations will break. Update links to use new paths:
- Old: `main/shadcn-form-generator.md`
- New: `main/skills/shadcn-form-generator/skill.md`

### Can I still use the skill the same way?
Yes! The command `/shadcn-form-generator` works exactly the same.

### How do I add a new skill?
See [CREATING_SKILLS.md](docs/CREATING_SKILLS.md) for a complete guide.

### Will there be more skills?
Yes! The roadmap includes:
- API client generator
- Component story generator (Storybook)
- E2E test generator
- And more...

Community contributions are welcome!

## Support

Questions about the migration?
- Open an [issue](https://github.com/voxuanthuan/waddle-skill/issues)
- Start a [discussion](https://github.com/voxuanthuan/waddle-skill/discussions)

## Acknowledgments

Thanks to all early adopters of the shadcn-form-generator skill. Your feedback helped shape this multi-skill repository!
