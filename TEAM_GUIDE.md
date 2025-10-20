# Team Distribution Guide

This guide helps you share the Shadcn Form Generator skill with your team or organization.

## For Team Leads / DevOps

### Quick Setup: 3 Easy Options

#### Option 1: NPM Package (Recommended for Most Teams)

**Setup (One-time):**
1. Update `package.json` with your organization details
2. Publish to npm or your private registry:
   ```bash
   npm publish
   # or for private registry
   npm publish --registry=https://your-registry.com
   ```

**Team Members Install:**
```bash
# Add to package.json devDependencies
npm install --save-dev claude-shadcn-form-generator

# or
pnpm add -D claude-shadcn-form-generator
```

**Advantages:**
- ✅ Automatic installation
- ✅ Version management
- ✅ Works with existing workflows
- ✅ Easy updates

#### Option 2: One-Line Installer (Fastest)

**Setup (One-time):**
1. Update the GitHub URL in `install.sh`
2. Host on GitHub or internal server

**Team Members Install:**
```bash
curl -fsSL https://your-server.com/install.sh | bash
```

**Advantages:**
- ✅ No dependencies
- ✅ Works anywhere
- ✅ Simple for non-technical users

#### Option 3: Add to Project Template

**Setup (One-time):**
1. Create `.claude/skills/` directory in your project template
2. Add the skill file
3. Commit to template repository

```bash
mkdir -p .claude/skills
cp shadcn-form-generator.md .claude/skills/
git add .claude/
git commit -m "Add Claude Code skills"
```

**Team Members Get It:**
- Automatically when cloning the project
- No extra installation steps

**Advantages:**
- ✅ Zero friction
- ✅ Always up to date
- ✅ Part of project setup

## For Development Teams

### Integration with Existing Workflows

#### 1. Add to `package.json` Scripts

```json
{
  "scripts": {
    "setup": "npm install && npm run install-skills",
    "install-skills": "curl -fsSL https://your-server.com/install.sh | bash",
    "update-skills": "npm update claude-shadcn-form-generator"
  },
  "devDependencies": {
    "claude-shadcn-form-generator": "^1.0.0"
  }
}
```

#### 2. Add to Onboarding Documentation

```markdown
## Developer Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Skills will be automatically installed

## Available Claude Code Skills

- `/shadcn-form-generator` - Generate React forms with shadcn/ui
```

#### 3. Add to `.github/workflows/`

```yaml
# .github/workflows/setup.yml
name: Setup Development Environment

on:
  push:
    branches: [main]

jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - name: Verify Skills
        run: |
          test -f .claude/skills/shadcn-form-generator.md || exit 1
```

## For Different Team Sizes

### Small Teams (2-10 developers)

**Recommended:** Direct file sharing

```bash
# Share via Slack/Teams
# 1. Upload shadcn-form-generator.md to shared channel
# 2. Team members download and place in .claude/skills/

# Or shared drive
cp /shared/skills/shadcn-form-generator.md .claude/skills/
```

### Medium Teams (10-50 developers)

**Recommended:** NPM + Internal Registry

```bash
# Setup Verdaccio (one-time)
npm install -g verdaccio
verdaccio

# Configure in .npmrc
registry=http://your-registry.com:4873/

# Publish
npm publish

# Team installs
npm install --save-dev claude-shadcn-form-generator
```

### Large Organizations (50+ developers)

**Recommended:** Internal Marketplace + CI/CD

1. **Create skill registry** (see MARKETPLACE.md)
2. **Integrate with CI/CD**
3. **Provide self-service portal**

```bash
# Central management
skills-cli install shadcn-form-generator
skills-cli list
skills-cli update
```

## Sharing Updates

### Version Updates

```bash
# Update version in package.json
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# Publish update
npm publish

# Notify team
# Post in Slack: "📦 New skill update available: v1.1.0"
```

### Changelog Template

```markdown
## v1.1.0 - 2025-10-20

### Added
- Support for multi-step forms
- New validation patterns

### Changed
- Improved error messages
- Better TypeScript types

### Fixed
- Date picker timezone issues

### Upgrade Instructions
`npm update claude-shadcn-form-generator`
```

## Communication Templates

### Announcement Email

```
Subject: New Claude Code Skill Available: Shadcn Form Generator

Hi Team,

We've created a new Claude Code skill to help speed up form development!

What it does:
- Generates complete React forms with validation
- Uses our standard stack (shadcn/ui, React Hook Form, Yup)
- Follows our coding conventions

How to install:
npm install --save-dev claude-shadcn-form-generator

How to use:
1. Open Claude Code
2. Type: /shadcn-form-generator
3. Follow the prompts

Documentation: https://github.com/your-org/claude-shadcn-form-generator

Questions? Ask in #dev-tools on Slack

Happy coding!
```

### Slack Message

```
🎉 New Claude Code Skill Available!

*Shadcn Form Generator* - Generate React forms instantly

📦 Install: `npm install -D claude-shadcn-form-generator`
🚀 Use: `/shadcn-form-generator` in Claude Code
📚 Docs: https://github.com/your-org/claude-shadcn-form-generator

Try it out and share your feedback! 🙌
```

## Training & Adoption

### Quick Start Guide for Team Members

```markdown
# Using the Shadcn Form Generator

## 1-Minute Setup

npm install -D claude-shadcn-form-generator

## Create Your First Form

1. Open Claude Code in your project
2. Type: `/shadcn-form-generator`
3. Answer the questions:
   - Form name: CreateUser
   - Fields: name (text), email (email)
   - Mutation: CREATE_USER
4. Generated code appears in your editor!

## What Gets Generated

- ✅ Complete TypeScript component
- ✅ Yup validation schema
- ✅ React Hook Form setup
- ✅ shadcn/ui components
- ✅ Error handling
- ✅ Loading states

## Example Use Cases

- User registration forms
- Product creation forms
- Settings pages
- Admin panels
```

### Lunch & Learn Session Outline

1. **Demo** (5 min)
   - Show live form generation
   - Compare before/after productivity

2. **Benefits** (5 min)
   - Time saved
   - Consistency
   - Best practices built-in

3. **Hands-on** (15 min)
   - Team members try it
   - Generate forms for current projects

4. **Q&A** (5 min)

## Metrics & Success Tracking

Track adoption and impact:

```javascript
// Add to your analytics
{
  "skill": "shadcn-form-generator",
  "installs": 45,
  "active_users": 32,
  "forms_generated": 128,
  "time_saved_hours": 64  // Estimated
}
```

## Support & Feedback

### Create a Support Channel

- Slack: `#claude-skills-support`
- Teams: Claude Code Skills
- Email: dev-tools@yourcompany.com

### Collect Feedback

```markdown
## Skill Feedback Form

1. How often do you use the skill?
   - [ ] Daily
   - [ ] Weekly
   - [ ] Monthly
   - [ ] Rarely

2. What do you like most?

3. What could be improved?

4. What other skills would you like to see?
```

## Troubleshooting Guide for Teams

### Common Issues

**Issue: Skill not showing in Claude Code**
```bash
# Solution
ls .claude/skills/shadcn-form-generator.md  # Verify file exists
# Restart Claude Code
```

**Issue: Installation fails**
```bash
# Solution
rm -rf node_modules package-lock.json
npm install
```

**Issue: Generated code has errors**
```bash
# Solution
# Update to latest version
npm update claude-shadcn-form-generator
```

## Customization for Your Team

### Add Team-Specific Patterns

Edit `shadcn-form-generator.md`:

```markdown
## Your Team Customizations

- Use your company's color scheme
- Add your analytics tracking
- Include your error monitoring
- Follow your naming conventions
```

### Create Organization Fork

```bash
# Fork on GitHub
# Customize for your needs
# Publish under your org
npm publish --scope=@yourorg
```

## ROI Calculation

Help justify the investment:

```
Time to manually create a form: 30 minutes
Time with skill: 5 minutes
Time saved: 25 minutes per form

If team creates 10 forms/week:
25 min × 10 forms × 50 weeks = 208 hours/year
```

## Next Steps

1. Choose distribution method (NPM recommended)
2. Publish skill
3. Announce to team
4. Provide documentation
5. Collect feedback
6. Iterate and improve

Need help? Check the [Marketplace Guide](MARKETPLACE.md) or open an issue!
