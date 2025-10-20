# Form Generator Skill

A production-ready Claude Code skill that generates React forms with shadcn/ui, React Hook Form, and Yup validation.

## Overview

This skill automates the creation of type-safe, validated form components following modern React patterns and best practices. It follows the official Claude Code skill structure with YAML frontmatter.

## Skill Structure

```
form-skill/
├── skill.md          # Main skill file with YAML frontmatter
├── README.md         # This documentation
└── examples/         # Working examples
    ├── contact-form.tsx
    └── product-form.tsx
```

### skill.md Format

```yaml
---
name: Form Generator
description: Use when generating React forms with shadcn/ui, React Hook Form, and Yup validation
---
```

The skill file includes:
- **When to Use** - Clear criteria for invoking the skill
- **Required Information** - What to ask the user
- **Code Templates** - Specific patterns for imports, validation, components, and fields
- **Critical Rules** - Non-negotiable patterns (mutation callbacks, refetchQueries limits)
- **Workflow** - Step-by-step generation process

## Features

- Type-safe forms with TypeScript and Yup schema inference
- React Hook Form integration with yupResolver
- shadcn/ui components - Beautiful, accessible UI
- Apollo Client mutations with proper callback handling
- Toast notifications for success/error
- Multiple field types with disabled state support
- Validation with proper error messages
- Conditional field rendering

## Field Types

| Type | Description | Example Use Case |
|------|-------------|------------------|
| `text` | Standard text input | Names, titles, descriptions |
| `number` | Numeric input | Quantities, IDs |
| `currency` | Formatted currency with $ | Prices, amounts, balances |
| `date` | Date picker | Birth dates, deadlines |
| `textarea` | Multi-line text | Comments, descriptions |
| `radio` | Yes/No radio group | Boolean choices |
| `select` | Async single select | Categories, users |
| `multi-select` | Async multi select | Tags, permissions |

## Usage

Invoke the skill in Claude Code:

```
/form-skill
```

The skill will ask you for:
1. Form name
2. Form fields (name, type, validation, label)
3. GraphQL mutation
4. Refetch queries (limit 1-2)
5. Success message
6. Props (ids, isDetail flag, etc.)

## Examples

### Simple Contact Form

**Prompt:**
```
Create ContactForm with:
- name (required text)
- email (required email)
- message (required textarea, min 10 chars)
- Mutation: CREATE_CONTACT
- Success: MESSAGE.CONTACT_SUCCESS
```

**Output:** Complete form with validation, error handling, and submission logic.

### Complex Product Form

**Prompt:**
```
Create ProductForm with:
- name (required text)
- price (required currency)
- releaseDate (optional date)
- isActive (required radio yes/no)
- description (optional textarea)
- Mutation: UPDATE_PRODUCT
- Refetch: GET_PRODUCTS
- Props: productId, isDetail
```

**Output:** Form with conditional logic, proper date/boolean handling, and disabled state.

## Critical Patterns

### Mutation Callbacks
✅ Use callbacks in mutation call:
```typescript
mutationName({
  variables: {},
  onCompleted: (data) => {},
  onError: (error) => {}
})
```

❌ Don't use in useMutation:
```typescript
const [mutation] = useMutation(MUTATION, {
  onCompleted: () => {}  // DON'T DO THIS
})
```

### RefetchQueries Limit
- ⚠️ Limit to 1-2 queries maximum
- Only use when cache update is complex
- Avoid if data refetches naturally

### Required Patterns
- `SubmitHandler<FormValues>` for type safety
- `useMemo` for defaultValues
- `useEffect` with `reset()` for updates
- `disableForm = useMemo(() => loading || isDetail, [...])`
- Transform dates with `moment().toString()`
- Parse booleans for radio groups

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-hook-form": "^7.0.0",
    "yup": "^1.0.0",
    "@hookform/resolvers": "^3.0.0",
    "@apollo/client": "^3.0.0",
    "react-toast-notifications": "^2.0.0",
    "moment": "^2.0.0",
    "react-number-format": "^5.0.0"
  }
}
```

Install shadcn/ui components: [Installation Guide](https://ui.shadcn.com/docs/installation)

## Working Examples

See `examples/` directory:
- `contact-form.tsx` - Simple form with text, email, textarea
- `product-form.tsx` - Complex form with currency, date, radio, conditional fields

## Best Practices Enforced

1. **Type Safety** - Full TypeScript coverage with Yup inference
2. **Validation** - Clear error messages with `.label()`
3. **Accessibility** - shadcn/ui accessible components
4. **Error Handling** - Consistent with `extractAPIValidationErrorToast`
5. **Performance** - Proper memoization and conditional rendering
6. **UX** - Loading states, disabled inputs, real-time validation
7. **Data Transformation** - Proper date/boolean handling before submit

## Version

1.0.0

## License

MIT
