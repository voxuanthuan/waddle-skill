#!/bin/bash

# Waddle Skills - Multi-Skill Installation Script
# This script installs Claude Code skills into your project

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         Waddle Skills - Multi-Skill Installer              ║"
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

# Base GitHub URL
GITHUB_BASE="https://raw.githubusercontent.com/voxuanthuan/waddle-skill/main"
SKILLS_MANIFEST_URL="$GITHUB_BASE/skills.json"

# Download skills manifest
echo "📥 Downloading skills manifest..."
TEMP_MANIFEST=$(mktemp)

if command -v curl &> /dev/null; then
    curl -fsSL "$SKILLS_MANIFEST_URL" -o "$TEMP_MANIFEST"
elif command -v wget &> /dev/null; then
    wget -q "$SKILLS_MANIFEST_URL" -O "$TEMP_MANIFEST"
else
    echo -e "${RED}Error: Neither curl nor wget is available. Please install one of them.${NC}"
    exit 1
fi

# Parse manifest and install skills
# Note: This requires jq for JSON parsing. If not available, install all default skills

if command -v jq &> /dev/null; then
    echo -e "${CYAN}📦 Parsing skills manifest...${NC}"

    # Get list of skills
    SKILL_COUNT=$(jq '.skills | length' "$TEMP_MANIFEST")
    echo -e "${CYAN}Found $SKILL_COUNT skill(s)${NC}"
    echo ""

    SUCCESS_COUNT=0
    FAIL_COUNT=0

    # Process each skill
    for i in $(seq 0 $((SKILL_COUNT - 1))); do
        SKILL_ID=$(jq -r ".skills[$i].id" "$TEMP_MANIFEST")
        SKILL_NAME=$(jq -r ".skills[$i].name" "$TEMP_MANIFEST")
        SKILL_VERSION=$(jq -r ".skills[$i].version" "$TEMP_MANIFEST")
        SKILL_FILE=$(jq -r ".skills[$i].skillFile" "$TEMP_MANIFEST")
        SKILL_COMMAND=$(jq -r ".skills[$i].installCommand" "$TEMP_MANIFEST")

        echo -e "${CYAN}📝 $SKILL_NAME v$SKILL_VERSION${NC}"

        SKILL_URL="$GITHUB_BASE/$SKILL_FILE"
        SKILL_TARGET="$SKILLS_DIR/${SKILL_ID}.md"

        echo "   Downloading from: $SKILL_FILE"

        if command -v curl &> /dev/null; then
            if curl -fsSL "$SKILL_URL" -o "$SKILL_TARGET"; then
                echo -e "   ${GREEN}✓ Installed successfully${NC}"
                ((SUCCESS_COUNT++))
            else
                echo -e "   ${RED}✗ Installation failed${NC}"
                ((FAIL_COUNT++))
            fi
        elif command -v wget &> /dev/null; then
            if wget -q "$SKILL_URL" -O "$SKILL_TARGET"; then
                echo -e "   ${GREEN}✓ Installed successfully${NC}"
                ((SUCCESS_COUNT++))
            else
                echo -e "   ${RED}✗ Installation failed${NC}"
                ((FAIL_COUNT++))
            fi
        fi

        echo "   Command: $SKILL_COMMAND"
        echo ""
    done

    # Summary
    echo "═══════════════════════════════════════════════════════════"
    echo -e "${GREEN}✓ Successfully installed: $SUCCESS_COUNT${NC}"
    if [ $FAIL_COUNT -gt 0 ]; then
        echo -e "${RED}✗ Failed: $FAIL_COUNT${NC}"
    fi

else
    # Fallback: Install default skill without jq
    echo -e "${YELLOW}⚠️  jq not found. Installing default skill...${NC}"

    SKILL_FILE="$SKILLS_DIR/shadcn-form-generator.md"
    GITHUB_URL="$GITHUB_BASE/skills/shadcn-form-generator/skill.md"

    if command -v curl &> /dev/null; then
        curl -fsSL "$GITHUB_URL" -o "$SKILL_FILE"
    elif command -v wget &> /dev/null; then
        wget -q "$GITHUB_URL" -O "$SKILL_FILE"
    fi

    if [ -f "$SKILL_FILE" ]; then
        echo -e "${GREEN}✓ Skill installed successfully!${NC}"
    else
        echo -e "${RED}Error: Failed to download skill file.${NC}"
        rm -f "$TEMP_MANIFEST"
        exit 1
    fi
fi

# Cleanup
rm -f "$TEMP_MANIFEST"

echo ""
echo -e "${CYAN}📍 Location: $SKILLS_DIR${NC}"
echo ""
echo -e "${CYAN}🚀 Usage in Claude Code:${NC}"
echo -e "${BLUE}   /shadcn-form-generator${NC}"
echo ""
echo -e "${CYAN}📚 Documentation:${NC}"
echo -e "${BLUE}   https://github.com/voxuanthuan/waddle-skill${NC}"
echo ""
echo -e "${GREEN}✨ Installation complete!${NC}"
