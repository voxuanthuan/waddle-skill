# Shadcn Form Generator - Claude Code Skill

A powerful Claude Code skill that generates production-ready React form components using shadcn/ui, React Hook Form, and Yup validation.

## Overview

This skill automates the creation of type-safe, validated form components following modern React patterns and best practices. Perfect for teams building applications with shadcn/ui and looking to maintain consistency across their forms.

## Features

- ✅ **Type-safe forms** with TypeScript and Yup schema inference
- ✅ **React Hook Form** integration with yupResolver
- ✅ **shadcn/ui components** - Beautiful, accessible form components
- ✅ **Apollo Client mutations** with automatic refetch queries
- ✅ **Toast notifications** for success/error handling
- ✅ **Multiple field types**:
  - Text inputs
  - Currency inputs (with number formatting)
  - Date pickers
  - Radio groups (Yes/No)
  - Textareas
  - Async select (single/multi)
- ✅ **Validation patterns** with proper error messages
- ✅ **Loading states** and disabled form handling
- ✅ **Accessibility** built-in with shadcn/ui

## Installation

### Prerequisites

- [Claude Code](https://claude.com/claude-code) installed
- A project using:
  - React 18+
  - TypeScript
  - shadcn/ui
  - React Hook Form
  - Yup
  - Apollo Client (optional, for GraphQL mutations)

### Quick Install (Choose One)

#### Option 1: NPM Package (Recommended)

```bash
npm install --save-dev claude-shadcn-form-generator
```

The skill will be automatically installed to `.claude/skills/` after installation.

#### Option 2: One-Line Installer

```bash
curl -fsSL https://raw.githubusercontent.com/YOUR_USERNAME/claude-shadcn-form-generator/main/install.sh | bash
```

#### Option 3: Manual Download

```bash
mkdir -p .claude/skills
curl -o .claude/skills/shadcn-form-generator.md https://raw.githubusercontent.com/YOUR_USERNAME/claude-shadcn-form-generator/main/shadcn-form-generator.md
```

### For Teams & Organizations

Setting this up for your team? See our comprehensive guides:

- **[Installation Guide](INSTALLATION.md)** - 9 different installation methods
- **[Team Distribution Guide](TEAM_GUIDE.md)** - Share with coworkers easily
- **[Marketplace Setup](MARKETPLACE.md)** - Create your own skill marketplace

The skill will be automatically available in Claude Code after installation!

## Usage

### Basic Usage

Invoke the skill in Claude Code:

```
/shadcn-form-generator
```

Or use the Skill command and follow the interactive prompts.

### Example 1: Simple Contact Form

**Prompt:**
```
Create a ContactForm with:
- name (required text)
- email (required email)
- message (required textarea)
- Mutation: CREATE_CONTACT_MESSAGE
- Success: "Message sent successfully!"
```

**Generated Output:**
```typescript
// Generates complete form component with:
// - Yup validation schema
// - React Hook Form setup
// - FormFields for each input
// - Apollo mutation integration
// - Error handling
```

### Example 2: Product Form with Complex Fields

**Prompt:**
```
Create a ProductForm with:
- name (required text)
- price (required currency)
- category (required select)
- isActive (required radio yes/no)
- releaseDate (optional date)
- description (optional textarea)
- Mutation: CREATE_PRODUCT
- Refetch: PRODUCTS_QUERY
- Success: "Product created successfully!"
```

### Example 3: User Assignment Form

**Prompt:**
```
Create an AssignUserForm with:
- role (required select)
- users (required multi-select)
- startDate (required date)
- Mutation: ASSIGN_USERS_TO_ROLE
- Props: roleId: string, onComplete: () => void
```

## Field Types Reference

The skill supports the following field types:

| Type | Description | Validation Options |
|------|-------------|-------------------|
| `text` | Standard text input | required, min, max, pattern |
| `email` | Email input with validation | required, email |
| `number` | Numeric input | required, min, max, positive |
| `currency` | Formatted currency input | required, min, max, positive |
| `date` | Date picker | required, min, max |
| `textarea` | Multi-line text | required, min, max |
| `radio` | Yes/No radio group | required |
| `select` | Async single select | required |
| `multi-select` | Async multi select | required, min items |
| `checkbox` | Single checkbox | required |

## Customization

The skill generates forms following these conventions:

- **Required fields**: Marked with red asterisk (*)
- **Error messages**: Red text below fields
- **Submit button**: Primary variant, disabled during loading
- **Validation mode**: `onChange` for real-time feedback
- **Success/Error toasts**: Automatic handling with proper messages

You can customize the generated code after creation to fit your specific needs.

## Project Structure

```
.
├── README.md                          # This file
├── shadcn-form-generator.md          # The Claude Code skill
├── INSTALLATION.md                    # Comprehensive installation guide
├── TEAM_GUIDE.md                      # Team distribution guide
├── MARKETPLACE.md                     # Marketplace setup guide
├── package.json                       # NPM package configuration
├── install.sh                         # Shell installation script
├── install.js                         # Node.js installation script
├── examples/                          # Example generated forms
│   ├── contact-form.tsx
│   ├── product-form.tsx
│   └── user-assignment-form.tsx
└── LICENSE
```

## Dependencies

Your project should have these dependencies installed:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-hook-form": "^7.0.0",
    "yup": "^1.0.0",
    "@hookform/resolvers": "^3.0.0",
    "@apollo/client": "^3.0.0",
    "react-toast-notifications": "^2.0.0"
  }
}
```

For shadcn/ui components, follow the [shadcn/ui installation guide](https://ui.shadcn.com/docs/installation).

## Best Practices

The skill enforces these best practices:

1. **Type Safety**: All forms are fully typed with TypeScript
2. **Validation**: Yup schemas with proper labels for error messages
3. **Accessibility**: Using shadcn/ui's accessible components
4. **Error Handling**: Consistent error handling with toast notifications
5. **Performance**: useCallback for submit handlers, proper memoization
6. **UX**: Loading states, disabled inputs, real-time validation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built for [Claude Code](https://claude.com/claude-code)
- Uses [shadcn/ui](https://ui.shadcn.com) components
- Inspired by modern React form patterns

## Documentation

- **[Installation Guide](INSTALLATION.md)** - Multiple installation methods
- **[Team Guide](TEAM_GUIDE.md)** - Share with your team
- **[Marketplace Guide](MARKETPLACE.md)** - Create a skill marketplace
- **[Examples](./examples)** - Sample generated forms

## Support

If you have questions or need help:

- Open an issue on GitHub
- Check the [examples](./examples) directory
- Read the [Claude Code documentation](https://docs.claude.com/claude-code)

## Changelog

### v1.0.0 (2025-10-20)
- Initial release
- Support for 10+ field types
- Apollo Client integration
- Complete TypeScript support
- Toast notifications
- Validation with Yup

---

Made with ❤️ for the Claude Code community
