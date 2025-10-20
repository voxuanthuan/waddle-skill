# Shadcn Form Generator

A powerful Claude Code skill that generates production-ready React form components using shadcn/ui, React Hook Form, and Yup validation.

## Overview

This skill automates the creation of type-safe, validated form components following modern React patterns and best practices.

## Features

- Type-safe forms with TypeScript and Yup schema inference
- React Hook Form integration with yupResolver
- shadcn/ui components - Beautiful, accessible form components
- Apollo Client mutations with automatic refetch queries
- Toast notifications for success/error handling
- Multiple field types:
  - Text inputs
  - Currency inputs (with number formatting)
  - Date pickers
  - Radio groups (Yes/No)
  - Textareas
  - Async select (single/multi)
- Validation patterns with proper error messages
- Loading states and disabled form handling
- Accessibility built-in with shadcn/ui

## Usage

Invoke the skill in Claude Code:

```
/shadcn-form-generator
```

### Example: Simple Contact Form

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
Complete form component with Yup validation schema, React Hook Form setup, FormFields for each input, Apollo mutation integration, and error handling.

### Example: Product Form with Complex Fields

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

## Field Types

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

## Dependencies

Your project should have these dependencies installed:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-hook-form": "^7.0.0",
    "yup": "^1.0.0",
    "@hookform/resolvers": "^3.0.0",
    "@apollo/client": "^3.0.0"
  }
}
```

For shadcn/ui components, follow the [shadcn/ui installation guide](https://ui.shadcn.com/docs/installation).

## Examples

See the `examples/` directory for complete working examples:
- `contact-form.tsx` - Simple contact form
- `product-form.tsx` - Complex form with multiple field types

## Best Practices

The skill enforces these best practices:

1. **Type Safety**: All forms are fully typed with TypeScript
2. **Validation**: Yup schemas with proper labels for error messages
3. **Accessibility**: Using shadcn/ui's accessible components
4. **Error Handling**: Consistent error handling with toast notifications
5. **Performance**: useCallback for submit handlers, proper memoization
6. **UX**: Loading states, disabled inputs, real-time validation

## Version

v1.0.0

## License

MIT
