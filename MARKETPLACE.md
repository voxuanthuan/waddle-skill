# Claude Code Skills Marketplace

This document explains how to create a skills marketplace for your team or organization.

## Overview

A skills marketplace allows team members to:
- Browse available Claude Code skills
- Install skills with one command
- Share custom skills across the organization
- Manage skill versions and updates

## Option 1: Simple GitHub-Based Marketplace

### Structure

```
your-org/claude-skills-marketplace/
├── skills/
│   ├── shadcn-form-generator/
│   │   ├── skill.md
│   │   ├── README.md
│   │   └── version.json
│   ├── api-endpoint-generator/
│   └── database-schema-builder/
├── registry.json
├── install.sh
└── README.md
```

### Registry File (`registry.json`)

```json
{
  "version": "1.0.0",
  "skills": [
    {
      "id": "shadcn-form-generator",
      "name": "Shadcn Form Generator",
      "description": "Generate React forms with shadcn/ui, React Hook Form, and Yup",
      "version": "1.0.0",
      "author": "Your Team",
      "category": "react",
      "tags": ["forms", "react", "typescript", "shadcn"],
      "installUrl": "https://raw.githubusercontent.com/your-org/claude-skills-marketplace/main/skills/shadcn-form-generator/skill.md",
      "documentation": "https://github.com/your-org/claude-skills-marketplace/tree/main/skills/shadcn-form-generator",
      "license": "MIT"
    }
  ],
  "categories": [
    "react",
    "backend",
    "devops",
    "testing",
    "documentation"
  ]
}
```

### Universal Install Script

```bash
#!/bin/bash
# install-skill.sh

MARKETPLACE_URL="https://raw.githubusercontent.com/your-org/claude-skills-marketplace/main"
REGISTRY_URL="$MARKETPLACE_URL/registry.json"

# Function to list available skills
list_skills() {
    echo "Available Claude Code Skills:"
    echo "=============================="
    curl -s "$REGISTRY_URL" | jq -r '.skills[] | "\(.id) - \(.name)"'
}

# Function to install a skill
install_skill() {
    local skill_id=$1

    # Get skill info from registry
    local skill_url=$(curl -s "$REGISTRY_URL" | jq -r ".skills[] | select(.id==\"$skill_id\") | .installUrl")

    if [ -z "$skill_url" ] || [ "$skill_url" == "null" ]; then
        echo "Error: Skill '$skill_id' not found"
        exit 1
    fi

    # Create skills directory
    mkdir -p .claude/skills

    # Download skill
    echo "Installing $skill_id..."
    curl -fsSL "$skill_url" -o ".claude/skills/${skill_id}.md"

    echo "✓ Skill installed successfully!"
}

# Main
case "$1" in
    list)
        list_skills
        ;;
    install)
        if [ -z "$2" ]; then
            echo "Usage: $0 install <skill-id>"
            exit 1
        fi
        install_skill "$2"
        ;;
    *)
        echo "Usage: $0 {list|install <skill-id>}"
        exit 1
        ;;
esac
```

**Usage:**
```bash
# List available skills
curl -fsSL https://your-org.com/install-skill.sh | bash -s list

# Install a specific skill
curl -fsSL https://your-org.com/install-skill.sh | bash -s install shadcn-form-generator
```

## Option 2: Web-Based Marketplace

Create a simple web interface for browsing and installing skills.

### HTML Interface (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claude Code Skills Marketplace</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; background: #f5f5f5; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; text-align: center; }
        .container { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
        .filters { background: white; padding: 1rem; border-radius: 8px; margin-bottom: 2rem; display: flex; gap: 1rem; }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .skill-card { background: white; border-radius: 8px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: transform 0.2s; }
        .skill-card:hover { transform: translateY(-4px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .skill-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; }
        .skill-title { font-size: 1.25rem; font-weight: 600; color: #333; }
        .skill-version { font-size: 0.875rem; color: #666; background: #f0f0f0; padding: 0.25rem 0.5rem; border-radius: 4px; }
        .skill-description { color: #666; margin-bottom: 1rem; line-height: 1.5; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .tag { font-size: 0.75rem; background: #e7f2ff; color: #0066cc; padding: 0.25rem 0.5rem; border-radius: 4px; }
        .install-btn { width: 100%; background: #667eea; color: white; border: none; padding: 0.75rem; border-radius: 4px; cursor: pointer; font-weight: 500; transition: background 0.2s; }
        .install-btn:hover { background: #5568d3; }
        .install-command { background: #f5f5f5; padding: 1rem; border-radius: 4px; font-family: monospace; font-size: 0.875rem; margin-top: 0.5rem; display: none; }
        .search-box { flex: 1; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎯 Claude Code Skills Marketplace</h1>
        <p>Discover and install skills to supercharge your development workflow</p>
    </div>

    <div class="container">
        <div class="filters">
            <input type="text" class="search-box" id="searchBox" placeholder="Search skills...">
            <select id="categoryFilter" style="padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px;">
                <option value="">All Categories</option>
                <option value="react">React</option>
                <option value="backend">Backend</option>
                <option value="devops">DevOps</option>
                <option value="testing">Testing</option>
            </select>
        </div>

        <div class="skills-grid" id="skillsGrid"></div>
    </div>

    <script>
        const REGISTRY_URL = 'https://raw.githubusercontent.com/your-org/claude-skills-marketplace/main/registry.json';

        let allSkills = [];

        async function loadSkills() {
            try {
                const response = await fetch(REGISTRY_URL);
                const data = await response.json();
                allSkills = data.skills;
                renderSkills(allSkills);
            } catch (error) {
                console.error('Failed to load skills:', error);
            }
        }

        function renderSkills(skills) {
            const grid = document.getElementById('skillsGrid');
            grid.innerHTML = skills.map(skill => `
                <div class="skill-card" data-category="${skill.category}">
                    <div class="skill-header">
                        <h3 class="skill-title">${skill.name}</h3>
                        <span class="skill-version">v${skill.version}</span>
                    </div>
                    <p class="skill-description">${skill.description}</p>
                    <div class="skill-tags">
                        ${skill.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <button class="install-btn" onclick="showInstallCommand('${skill.id}', '${skill.installUrl}')">
                        📥 Install Skill
                    </button>
                    <div class="install-command" id="install-${skill.id}">
                        <strong>Run this command:</strong><br>
                        <code>curl -o .claude/skills/${skill.id}.md ${skill.installUrl}</code>
                        <br><br>
                        <strong>Or via NPM:</strong><br>
                        <code>npm install --save-dev ${skill.id}</code>
                    </div>
                </div>
            `).join('');
        }

        function showInstallCommand(skillId, url) {
            const element = document.getElementById(`install-${skillId}`);
            element.style.display = element.style.display === 'none' ? 'block' : 'none';
        }

        // Search functionality
        document.getElementById('searchBox').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = allSkills.filter(skill =>
                skill.name.toLowerCase().includes(searchTerm) ||
                skill.description.toLowerCase().includes(searchTerm) ||
                skill.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
            renderSkills(filtered);
        });

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            const category = e.target.value;
            const filtered = category ? allSkills.filter(skill => skill.category === category) : allSkills;
            renderSkills(filtered);
        });

        loadSkills();
    </script>
</body>
</html>
```

## Option 3: NPM Organization Package

Publish skills under your organization scope:

```bash
# Publish
npm publish --access public --scope=@your-org

# Install
npm install @your-org/claude-skill-shadcn-form-generator
```

### Monorepo Structure

```
@your-org/claude-skills/
├── packages/
│   ├── shadcn-form-generator/
│   ├── api-generator/
│   └── db-schema-builder/
├── lerna.json
└── package.json
```

## Option 4: Internal Package Registry

Use Verdaccio or Artifactory:

```bash
# Setup Verdaccio
npm install -g verdaccio
verdaccio

# Configure .npmrc
registry=http://localhost:4873/

# Publish
npm publish

# Team installs
npm install claude-shadcn-form-generator
```

## Option 5: Self-Hosted API

Create a REST API for skill management:

```javascript
// api/skills.js
app.get('/api/skills', (req, res) => {
  res.json(registry.skills);
});

app.get('/api/skills/:id', (req, res) => {
  const skill = registry.skills.find(s => s.id === req.params.id);
  res.json(skill);
});

app.get('/api/skills/:id/download', (req, res) => {
  const skillPath = path.join(__dirname, 'skills', req.params.id, 'skill.md');
  res.download(skillPath);
});
```

## Recommendation for Your Team

For coworkers to easily add skills, I recommend:

1. **Quick Start**: Use Method 1 (GitHub-based) + NPM packages
2. **For Teams**: Create internal npm packages
3. **For Large Orgs**: Build web marketplace (Option 2)

Would you like me to set up any of these options for your specific use case?
