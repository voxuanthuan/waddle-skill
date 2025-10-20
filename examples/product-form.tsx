// Example: Product Form with Currency and Date Fields
// Generated with shadcn-form-generator skill

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { FC, useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { useToasts } from 'react-toast-notifications'
import { NumericFormat } from 'react-number-format'
import moment from 'moment'

import { Button } from 'components/ui/button'
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
import NewDateInputPicker from 'components/shared/date-picker'
import GAsyncSelect from 'components/shared/g-select/async'

import { extractAPIValidationErrorToast } from 'helpers/data'
import { MESSAGE } from 'appconfig'
import { CREATE_PRODUCT } from './query'
import { PRODUCTS_QUERY } from './query'
import { useCategoryOptions } from './use-category-options'

const formSchema = yup.object({
  name: yup.string().required().label('Product Name'),
  price: yup.number().required().positive().label('Price'),
  category: yup.object().required().label('Category'),
  isActive: yup.boolean().required().label('Active Status'),
  releaseDate: yup.date().nullable().label('Release Date'),
  description: yup.string().nullable().label('Description'),
})

type FormSchemaType = yup.InferType<typeof formSchema>
type SelectType = { value: string; label: string }

interface ProductFormProps {
  onSuccess?: () => void
}

const ProductForm: FC<ProductFormProps> = ({ onSuccess }) => {
  const { addToast } = useToasts()

  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [PRODUCTS_QUERY],
  })

  const { promiseCategoryOptions } = useCategoryOptions()

  const form = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      price: 0,
      category: null,
      isActive: false,
      releaseDate: null,
      description: '',
    },
  })

  const { setValue, clearErrors } = form

  const onSubmit = useCallback(
    async (data: FormSchemaType) => {
      try {
        const category = data.category as SelectType
        const releaseDate = data.releaseDate
          ? moment(data.releaseDate).toISOString()
          : null

        const result = await createProduct({
          variables: {
            input: {
              name: data.name,
              price: data.price,
              categoryId: category.value,
              isActive: data.isActive,
              releaseDate,
              description: data.description,
            },
          },
        })

        if (result) {
          addToast(MESSAGE.PRODUCT_CREATED_SUCCESS, {
            appearance: 'success',
            autoDismiss: true,
          })
          form.reset()
          onSuccess?.()
        }
      } catch (error) {
        extractAPIValidationErrorToast(error, addToast)
      }
    },
    [addToast, createProduct, form, onSuccess]
  )

  return (
    <Form {...form}>
      <form
        className="container mx-auto px-0"
        method="post"
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>
                Product Name <i className="text-red-500">*</i>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter product name" />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="price"
              render={({ field: { onChange, value } }) => (
                <FormItem className="mb-4">
                  <FormLabel>
                    Price <i className="text-red-500">*</i>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-1 top-1/2 -translate-y-1/2">
                        $
                      </span>
                      <NumericFormat
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
          </div>

          <div className="flex-1">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>
                    Category <i className="text-red-500">*</i>
                  </FormLabel>
                  <FormControl>
                    <GAsyncSelect
                      {...field}
                      loadOptions={promiseCategoryOptions}
                      cacheOptions
                      defaultOptions
                      prefix="g-select-v3"
                      isSearchable
                      isMulti={false}
                      onChange={(select) => {
                        if (select) {
                          setValue('category', select)
                          clearErrors('category')
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>
                Active Status <i className="text-red-500">*</i>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(value === 'true')}
                  value={field.value?.toString()}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="font-normal">Active</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="font-normal">Inactive</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="releaseDate"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Release Date</FormLabel>
              <NewDateInputPicker
                value={field.value}
                className="w-full"
                onChange={(date) => field.onChange(date)}
              />
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <FormItem className="mb-4">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  className="focus-visible:ring-slate-400"
                  rows={4}
                  value={value}
                  onChange={onChange}
                  placeholder="Product description..."
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="bg-primary rounded-full hover:opacity-80 text-white text-sm px-6"
          >
            Create Product
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
