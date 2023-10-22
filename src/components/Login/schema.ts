import z from 'zod'

const loginSchema = z.object({
    username: z
        .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string'
        })
        .min(8, { message: 'Name must at least be 8 characters' })
        .max(16, { message: 'Name must not exceed 16 characters' })
        .refine((s) => !s.includes(' '), "Name mustn't contain spaces"),
    password: z
        .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string'
        })
        .min(8, { message: 'Password must at least be 8 characters' })
        .max(16, { message: 'Password must not exceed 16 characters' })
})

type loginSchemaType = z.infer<typeof loginSchema>

export { loginSchema, loginSchemaType }
