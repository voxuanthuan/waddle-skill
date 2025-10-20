# Installation Guide

This guide provides multiple methods to install the Shadcn Form Generator skill for Claude Code.

## Quick Install (Recommended)

### Method 1: One-Line Install Script

```bash
curl -fsSL https://raw.githubusercontent.com/YOUR_USERNAME/claude-shadcn-form-generator/main/install.sh | bash
```

Or using wget:
```bash
wget -qO- https://raw.githubusercontent.com/YOUR_USERNAME/claude-shadcn-form-generator/main/install.sh | bash
```

### Method 2: NPM Package

Install as a dev dependency in your project:

```bash
npm install --save-dev claude-shadcn-form-generator
```

Or using yarn:
```bash
yarn add -D claude-shadcn-form-generator
```

Or using pnpm:
```bash
pnpm add -D claude-shadcn-form-generator
```

The skill will be automatically installed to `.claude/skills/` after installation.

## Manual Installation

### Method 3: Direct Download

1. Create the skills directory:
   ```bash
   mkdir -p .claude/skills
   ```

2. Download the skill file:
   ```bash
   curl -o .claude/skills/shadcn-form-generator.md \
     https://raw.githubusercontent.com/YOUR_USERNAME/claude-shadcn-form-generator/main/shadcn-form-generator.md
   ```

### Method 4: Git Clone

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/claude-shadcn-form-generator.git /tmp/shadcn-form-generator
   ```

2. Copy the skill file:
   ```bash
   mkdir -p .claude/skills
   cp /tmp/shadcn-form-generator/shadcn-form-generator.md .claude/skills/
   ```

## Team/Organization Installation

### Method 5: Private NPM Registry

For organizations using private NPM registries:

1. **Publish to your private registry:**
   ```bash
   # In the skill repository
   npm publish --registry=https://your-private-registry.com
   ```

2. **Team members install:**
   ```bash
   npm install --save-dev claude-shadcn-form-generator \
     --registry=https://your-private-registry.com
   ```

### Method 6: Git Submodule

For teams managing skills via git submodules:

1. **Add as submodule:**
   ```bash
   git submodule add \
     https://github.com/YOUR_USERNAME/claude-shadcn-form-generator.git \
     .claude/skills-repo/shadcn-form-generator
   ```

2. **Create symlink:**
   ```bash
   mkdir -p .claude/skills
   ln -s ../skills-repo/shadcn-form-generator/shadcn-form-generator.md \
     .claude/skills/shadcn-form-generator.md
   ```

3. **Team members clone with submodules:**
   ```bash
   git clone --recurse-submodules <your-project-repo>
   ```

### Method 7: Internal Package Server

Host the skill on your internal server:

1. **Create install script for your team:**
   ```bash
   #!/bin/bash
   # install-skills.sh

   mkdir -p .claude/skills

   # Download from internal server
   curl -o .claude/skills/shadcn-form-generator.md \
     https://internal-server.company.com/claude-skills/shadcn-form-generator.md
   ```

2. **Team members run:**
   ```bash
   ./install-skills.sh
   ```

### Method 8: Shared Network Drive

For teams with shared network access:

1. **Store skill on shared drive:**
   ```bash
   # Admin stores the skill
   cp shadcn-form-generator.md /shared/drive/claude-skills/
   ```

2. **Team members copy from shared drive:**
   ```bash
   mkdir -p .claude/skills
   cp /shared/drive/claude-skills/shadcn-form-generator.md .claude/skills/
   ```

## CI/CD Integration

### Method 9: Automated Setup in CI/CD

Add to your `.github/workflows/setup.yml` or similar:

```yaml
name: Setup Development Environment

on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install Claude Code Skills
        run: |
          mkdir -p .claude/skills
          curl -o .claude/skills/shadcn-form-generator.md \
            https://raw.githubusercontent.com/YOUR_USERNAME/claude-shadcn-form-generator/main/shadcn-form-generator.md
```

## Verification

After installation, verify the skill is available:

1. **Check if file exists:**
   ```bash
   ls -la .claude/skills/shadcn-form-generator.md
   ```

2. **In Claude Code:**
   - Type `/` to see available skills
   - Look for `shadcn-form-generator` in the list
   - Run `/shadcn-form-generator` to test

## Updating the Skill

### Update via NPM
```bash
npm update claude-shadcn-form-generator
```

### Update via Script
```bash
curl -fsSL https://raw.githubusercontent.com/YOUR_USERNAME/claude-shadcn-form-generator/main/install.sh | bash
```

### Update Manually
```bash
curl -o .claude/skills/shadcn-form-generator.md \
  https://raw.githubusercontent.com/YOUR_USERNAME/claude-shadcn-form-generator/main/shadcn-form-generator.md
```

## Uninstallation

Remove the skill file:
```bash
rm .claude/skills/shadcn-form-generator.md
```

If installed via NPM:
```bash
npm uninstall claude-shadcn-form-generator
```

## Troubleshooting

### Skill not showing in Claude Code

1. Check file location:
   ```bash
   ls -la .claude/skills/
   ```

2. Verify file name is correct: `shadcn-form-generator.md`

3. Restart Claude Code

### Permission Issues

If you get permission errors during installation:
```bash
sudo chown -R $USER:$USER .claude/
chmod -R 755 .claude/
```

### Network Issues

If download fails due to network issues:
1. Download manually from GitHub releases
2. Copy to `.claude/skills/` directory

## Multiple Projects

To use across multiple projects:

### Option A: Global Installation Script
```bash
# Create a global install script
cat > ~/install-claude-skills.sh << 'EOF'
#!/bin/bash
mkdir -p .claude/skills
curl -o .claude/skills/shadcn-form-generator.md \
  https://raw.githubusercontent.com/YOUR_USERNAME/claude-shadcn-form-generator/main/shadcn-form-generator.md
EOF

chmod +x ~/install-claude-skills.sh

# Run in any project
cd /path/to/project
~/install-claude-skills.sh
```

### Option B: Template Repository
Create a template repo with `.claude/skills/` pre-configured.

## Support

If you encounter issues:
- Check [GitHub Issues](https://github.com/YOUR_USERNAME/claude-shadcn-form-generator/issues)
- Create a new issue with:
  - Installation method used
  - Error messages
  - OS and environment details
