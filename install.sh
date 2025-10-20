#!/bin/bash

# Shadcn Form Generator - Installation Script
# This script installs the skill into your Claude Code project

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   Shadcn Form Generator - Claude Code Skill Installer     ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if we're in a git repository (optional check)
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${YELLOW}Warning: Not in a git repository. Continuing anyway...${NC}"
fi

# Create .claude/skills directory if it doesn't exist
SKILLS_DIR=".claude/skills"
if [ ! -d "$SKILLS_DIR" ]; then
    echo "📁 Creating $SKILLS_DIR directory..."
    mkdir -p "$SKILLS_DIR"
fi

# Download the skill file
SKILL_FILE="$SKILLS_DIR/shadcn-form-generator.md"
GITHUB_URL="https://raw.githubusercontent.com/YOUR_USERNAME/claude-shadcn-form-generator/main/shadcn-form-generator.md"

echo "📥 Downloading skill file..."

if command -v curl &> /dev/null; then
    curl -fsSL "$GITHUB_URL" -o "$SKILL_FILE"
elif command -v wget &> /dev/null; then
    wget -q "$GITHUB_URL" -O "$SKILL_FILE"
else
    echo -e "${RED}Error: Neither curl nor wget is available. Please install one of them.${NC}"
    exit 1
fi

# Verify the file was downloaded
if [ -f "$SKILL_FILE" ]; then
    echo -e "${GREEN}✓ Skill installed successfully!${NC}"
    echo ""
    echo "📍 Location: $SKILL_FILE"
    echo ""
    echo "🚀 Usage:"
    echo "   Run in Claude Code: /shadcn-form-generator"
    echo ""
    echo "📚 Documentation:"
    echo "   https://github.com/YOUR_USERNAME/claude-shadcn-form-generator"
    echo ""
    echo -e "${GREEN}Installation complete!${NC}"
else
    echo -e "${RED}Error: Failed to download skill file.${NC}"
    exit 1
fi
