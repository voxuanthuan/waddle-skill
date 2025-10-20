---
name: Form Generator
description: Use when generating React forms with shadcn/ui, React Hook Form, and Yup validation
---

# Form Generator Skill

Generate production-ready React forms with shadcn/ui, React Hook Form, Yup validation, and Apollo Client integration.

## When to Use

Use this skill when you need to create forms with:
- Type-safe validation using Yup
- shadcn/ui components
- GraphQL mutations
- Multiple field types (text, currency, date, radio, textarea, etc.)
- Error handling and success notifications

## Required Information

Before generating, ask the user for:

1. **Form name** - Component name (e.g., "CreateUserForm", "UpdateProductForm")
2. **Form fields** - For each field:
   - Field name
   - Field type: text, number, currency, date, textarea, radio, select, multi-select
   - Validation rules: required, min, max, pattern, etc.
   - Label text
   - Optional: Default value, placeholder
3. **GraphQL mutation** - Mutation name to call on submit
4. **Refetch queries** - Queries to refetch after success (LIMIT: 1-2 max, use only if necessary)
5. **Success message** - Toast message constant from MESSAGE
6. **Props** - Additional props (e.g., ids, isDetail flag, callbacks)

## Code Templates

### Imports

```typescript
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useMutation } from '@apollo/client'
import { useToasts } from 'react-toast-notifications'
import moment from 'moment'
import { NumericFormat } from 'react-number-format'

import { Button } from '@components-v2/shared/shadcn/g-button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components-v2/shared/shadcn/form'
import { Input } from '@components-v2/shared/shadcn/input'
import { Textarea } from '@components-v2/shared/shadcn/textarea'
import { RadioGroup, RadioGroupItem } from '@components-v2/shared/shadcn/radio-group'
import NewDateInputPicker from 'components-v2/shared/g-date-input/input-date'

import { extractAPIValidationErrorToast } from 'helpers/data'
import { MESSAGE } from 'appconfig'
```

### Validation Schema

```typescript
const formSchema = yup.object({
  // Generate based on user requirements
  // Examples:
  // name: yup.string().required().label('Name')
  // email: yup.string().email().required().label('Email')
  // amount: yup.string().required().label('Amount')
  // date: yup.date().nullable().required().label('Date')
  // accepted: yup.boolean().required().label('Terms')
})

type FormValues = yup.InferType<typeof formSchema>
```

### Component Structure

```typescript
const FormComponent: FC<Props> = ({ id, isDetail, existingData }) => {
  const { addToast } = useToasts()

  const defaultValues = useMemo(() => ({
    // Transform existing data to form values
  }), [existingData])

  const form = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues,
  })

  const { reset } = form

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const [mutationName, { loading }] = useMutation(MUTATION_NAME)

  const disableForm = useMemo(() => loading || isDetail, [isDetail, loading])

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    // Transform before submitting
    const date = values?.date ? moment(values.date).toString() : null
    const boolField = values?.boolField?.toString() === 'true'

    mutationName({
      variables: { id, ...values, boolField, date },
      refetchQueries: [QUERY_NAME],
      onCompleted: (data) => {
        if (data) {
          addToast(MESSAGE.SUCCESS, {
            appearance: 'success',
            autoDismiss: true,
          })
        }
      },
      onError: (error) => {
        extractAPIValidationErrorToast(error, addToast)
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
        {/* Fields here */}

        <div className="flex items-center">
          <Button
            disabled={disableForm}
            className="py-2 px-6 m-auto"
            variant="primary"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
```

## Field Template Example

Generate appropriate FormField based on field type. Example structure:

```typescript
<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Label {required && <i className="text-red-500">*</i>}</FormLabel>
      <FormControl>
        {/* Use appropriate input component based on field type:
          - Input for text/email/number
          - NumericFormat with Input for currency (with $ prefix)
          - Textarea for multi-line text
          - RadioGroup with RadioGroupItem for Yes/No boolean
          - NewDateInputPicker for dates
          - GAsyncSelect for select/multi-select
        */}
        <Input {...field} placeholder="..." disabled={disableForm} />
      </FormControl>
      <FormMessage className="text-red-400" />
    </FormItem>
  )}
/>
```

For conditional fields, use `form.watch()`:
```typescript
const watchedField = form.watch('fieldName')
{watchedField === true && <FormField ... />}
```


### RefetchQueries
- ⚠️ LIMIT to 1-2 queries maximum
- Only use when cache update is complex
- Avoid if data refetches naturally on navigation
- Example: `refetchQueries: [GET_ACTIVE_DATA]`

### Required Patterns
1. Use `SubmitHandler<FormValues>` for type safety
2. Use `useMemo` for defaultValues
3. Use `useEffect` with `reset()` for form updates
4. Combine `loading || isDetail` for disableForm
5. Mark required fields with `<i className="text-red-500">*</i>`
6. Use `FormMessage className="text-red-400"` for errors
7. Transform dates with `moment().toString()` before submit
8. Parse booleans from string values for radio groups

### Helper Function
For nullable boolean fields:
```typescript
const parseBooleanOrNull = useCallback((value: string) => {
  if (value === 'true') return true
  if (value === 'false') return false
  return null
}, [])
```

## Workflow

1. Ask user for all required information
2. Create validation schema with proper types
3. Generate component with proper hooks setup
4. Add form fields using appropriate templates
5. Implement submit handler with transformations
6. Add error handling and success notifications
7. Ensure all fields have disabled state

Start by asking the user for the required information listed above.
