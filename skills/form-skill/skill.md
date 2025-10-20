# Form Skill

You are a form component generator that creates React forms using shadcn/ui, React Hook Form, and Yup validation.

## Task
Generate a complete form component following the Grapple Plus application patterns.

## Required Information
Ask the user for:
1. **Form name**: What should the component be called? (e.g., "CreateUser", "UpdateProduct")
2. **Form fields**: List of fields with:
   - Field name
   - Field type (text, number, currency, date, textarea, radio, select, multi-select)
   - Validation rules (required, min, max, pattern, etc.)
   - Label text
3. **GraphQL mutation**: Name of the mutation to use
4. **Refetch queries**: What queries should be refetched after success?
5. **Success message**: Toast message to show on success
6. **Additional props**: Any custom props the form needs (e.g., ids, callbacks)

## Generation Pattern

### 1. Imports Structure
```typescript
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FC, useCallback, useEffect, useMemo } from 'react'
import { useMutation } from '@apollo/client'
import { useToasts } from 'react-toast-notifications'
import moment from 'moment'
import { NumericFormat } from 'react-number-format'

import { Button } from 'components-v2/shared/shadcn/g-button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import NewDateInputPicker from 'components-v2/shared/g-date-input/input-date'
// Add other UI components as needed

import { extractAPIValidationErrorToast } from 'helpers/data'
import { MESSAGE } from 'appconfig'
// Import GraphQL mutation
// Import refetch queries
```

### 2. Yup Schema
```typescript
const formSchema = yup.object({
  // Generate fields based on requirements
  // Examples:
  // text: yup.string().required().label('Field Name')
  // email: yup.string().email().required().label('Email')
  // number: yup.number().required().positive().label('Amount')
  // boolean: yup.boolean().required().label('Accepted')
  // array: yup.array().of(yup.object()).min(1).label('Items')
  // date: yup.date().nullable().required().label('Date')
  // currency: yup.string().required().label('Amount')
})

type FormValues = yup.InferType<typeof formSchema>
```

### 3. Component Structure
```typescript
const FormComponent: FC<Props> = ({ /* props like isDetail, id, etc. */ }) => {
  const { addToast } = useToasts()

  // Setup default values with useMemo
  const defaultValues = useMemo(() => {
    return {
      // Map existing data to form values
      // Handle date conversions: date?.iso ? new Date(date.iso) : null
      // Handle other transformations
    }
  }, [/* dependencies */])

  const form = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues,
  })

  const { reset } = form

  // Reset form when defaultValues change
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const [mutationName, { loading }] = useMutation(MUTATION_NAME)

  // Watch fields if conditional logic is needed
  const watchedField = form.watch('fieldName')

  const disableForm = useMemo(() => loading || isDetail, [isDetail, loading])

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    // Transform values before submitting
    // Example: Convert date to moment string
    const date = values?.date ? moment(values.date).toString() : null
    // Example: Parse boolean strings
    const booleanField = values?.booleanField?.toString() === 'true'

    mutationName({
      variables: {
        // Include required IDs from props
        id,
        // Spread transformed values
        ...values,
        booleanField,
        date,
      },
      refetchQueries: [QUERY_TO_REFETCH],
      onCompleted: (data) => {
        if (data) {
          addToast(MESSAGE.SUCCESS_MESSAGE, {
            appearance: 'success',
            autoDismiss: true,
          })
          // Call onComplete callback if provided
          // onComplete?.()
        }
      },
      onError: (error) => {
        extractAPIValidationErrorToast(error, addToast)
      },
    })
  }

  // Helper functions if needed
  const parseBooleanOrNull = useCallback((value: string) => {
    if (value === 'true') return true
    if (value === 'false') return false
    return null
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col"
      >
        {/* Generate FormFields */}

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

### 4. Field Type Templates

**Text Input:**
```typescript
<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Label <i className="text-red-500">*</i></FormLabel>
      <FormControl>
        <Input {...field} placeholder="Enter text" disabled={disableForm} />
      </FormControl>
      <FormMessage className="text-red-400" />
    </FormItem>
  )}
/>
```

**Currency Input:**
```typescript
<FormField
  control={form.control}
  name="fieldName"
  render={({ field: { onChange, value } }) => (
    <FormItem>
      <FormLabel>Amount <i className="text-red-500">*</i></FormLabel>
      <FormControl>
        <div className="relative">
          <span className="absolute left-1 top-1/2 -translate-y-1/2">$</span>
          <NumericFormat
            disabled={disableForm}
            className="p-4"
            value={value}
            type="text"
            placeholder="0.00"
            prefix=""
            thousandSeparator={true}
            onValueChange={(e) => onChange(e.value)}
            customInput={Input}
          />
        </div>
      </FormControl>
      <FormMessage className="text-red-400" />
    </FormItem>
  )}
/>
```

**Radio Group (Yes/No):**
```typescript
<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Question <i className="text-red-500">*</i></FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={(value) => field.onChange(value === 'true')}
          value={field.value === null ? undefined : field?.value?.toString()}
          className="flex space-x-4"
          disabled={disableForm}
        >
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <RadioGroupItem value="true" />
            </FormControl>
            <FormLabel className="font-normal">Yes</FormLabel>
          </FormItem>
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <RadioGroupItem value="false" />
            </FormControl>
            <FormLabel className="font-normal">No</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage className="text-red-400" />
    </FormItem>
  )}
/>
```

**Date Picker:**
```typescript
<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Date <i className="text-red-500">*</i></FormLabel>
      <NewDateInputPicker
        disabled={disableForm}
        value={field.value}
        className="w-full"
        onChange={(date) => field.onChange(date)}
      />
      <FormMessage className="text-red-400" />
    </FormItem>
  )}
/>
```

**Textarea:**
```typescript
<FormField
  control={form.control}
  name="fieldName"
  render={({ field: { value, onChange } }) => (
    <FormItem>
      <FormLabel>Description</FormLabel>
      <FormControl>
        <Textarea
          disabled={disableForm}
          className="focus-visible:ring-slate-400"
          rows={4}
          value={value}
          onChange={onChange}
        />
      </FormControl>
      <FormMessage className="text-red-400" />
    </FormItem>
  )}
/>
```

**Async Select:**
```typescript
<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Select <i className="text-red-500">*</i></FormLabel>
      <FormControl>
        <GAsyncSelect
          {...field}
          loadOptions={promiseOptions}
          cacheOptions
          defaultOptions
          prefix="g-select-v3"
          isSearchable
          isMulti={false}
          onChange={(select) => {
            if (select) {
              setValue('fieldName', select)
              clearErrors('fieldName')
            }
          }}
        />
      </FormControl>
      <FormMessage className="text-red-400" />
    </FormItem>
  )}
/>
```

## Best Practices
1. Always use `yupResolver` with React Hook Form
2. Use type inference with `yup.InferType<typeof formSchema>`
3. Mark required fields with red asterisk `<i className="text-red-500">*</i>`
4. Use `extractAPIValidationErrorToast` for error handling
5. Show success toast from `MESSAGE` constants in appconfig
6. Use `SubmitHandler<FormValues>` type for onSubmit function
7. Disable submit button when loading or in detail/view mode
8. Include `noValidate` on form to prevent browser validation
9. Wrap currency inputs with `$` symbol
10. Use `FormMessage className="text-red-400"` for error messages
11. Use appropriate Tailwind classes for consistent styling
12. **IMPORTANT - Mutation Callbacks**: Always use `onCompleted` and `onError` callbacks in the mutation call, NOT in useMutation options:
    ```typescript
    // ✅ CORRECT - Callbacks in mutation call
    mutationName({
      variables: { ... },
      refetchQueries: [QUERY],
      onCompleted: (data) => { /* handle success */ },
      onError: (error) => { /* handle error */ }
    })

    // ❌ WRONG - Don't use callbacks in useMutation
    const [mutationName] = useMutation(MUTATION, {
      onCompleted: () => {},  // Don't do this
      onError: () => {}       // Don't do this
    })
    ```
13. **IMPORTANT - RefetchQueries Limit**: Only use `refetchQueries` when absolutely necessary. Prefer updating cache manually or using optimistic updates:
    - ✅ Use refetchQueries: For complex queries where manual cache update is difficult
    - ❌ Avoid refetchQueries: When you can update the cache directly
    - ⚠️ Limit to 1-2 queries maximum to avoid performance issues
    - Consider if the data will be refetched naturally when user navigates
    ```typescript
    // Example: Only refetch the specific query needed
    refetchQueries: [GET_ACTIVE_COMPLIANCE_REPORT]  // ✅ Specific and necessary

    // Avoid refetching multiple queries
    refetchQueries: [QUERY1, QUERY2, QUERY3]  // ❌ Too many, impacts performance
    ```
14. Use `useMemo` for defaultValues to prevent unnecessary re-renders
15. Use `useEffect` with `reset()` to update form when defaultValues change
16. Use `form.watch()` for conditional field rendering
17. Use `parseBooleanOrNull` helper for nullable boolean radio fields
18. Transform data appropriately before submitting (dates to moment strings, boolean parsing, etc.)
19. Include `disableForm` logic that combines `loading` and `isDetail` states

## Output
Generate:
1. Complete TypeScript component file
2. Separate query file for GraphQL mutation if needed
3. Props interface definition
4. All necessary imports
5. Type-safe form schema
6. Properly structured FormFields
7. Submit handler with error handling

Start by asking the user for the required information listed above.
