// Example: Simple Contact Form
// Generated with shadcn-form-generator skill

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { FC, useCallback } from 'react'
import { useMutation } from '@apollo/client'
import { useToasts } from 'react-toast-notifications'

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

import { extractAPIValidationErrorToast } from 'helpers/data'
import { MESSAGE } from 'appconfig'
import { CREATE_CONTACT_MESSAGE } from './query'

const formSchema = yup.object({
  name: yup.string().required().label('Name'),
  email: yup.string().email().required().label('Email'),
  message: yup.string().required().min(10).label('Message'),
})

type FormSchemaType = yup.InferType<typeof formSchema>

interface ContactFormProps {
  onSuccess?: () => void
}

const ContactForm: FC<ContactFormProps> = ({ onSuccess }) => {
  const { addToast } = useToasts()

  const [createContactMessage, { loading }] = useMutation(CREATE_CONTACT_MESSAGE)

  const form = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = useCallback(
    async (data: FormSchemaType) => {
      try {
        const result = await createContactMessage({
          variables: {
            input: {
              name: data.name,
              email: data.email,
              message: data.message,
            },
          },
        })

        if (result) {
          addToast(MESSAGE.CONTACT_MESSAGE_SENT, {
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
    [addToast, createContactMessage, form, onSuccess]
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
                Name <i className="text-red-500">*</i>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your name" />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>
                Email <i className="text-red-500">*</i>
              </FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="your@email.com" />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field: { value, onChange } }) => (
            <FormItem className="mb-4">
              <FormLabel>
                Message <i className="text-red-500">*</i>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="focus-visible:ring-slate-400"
                  rows={4}
                  value={value}
                  onChange={onChange}
                  placeholder="Your message..."
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
            Send Message
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ContactForm
