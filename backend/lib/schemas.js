import { z } from 'zod'

export const signupSchema = z.object({
    username: z.string()
        .trim()
        .min(3, 'Username must be at least 3 characters')
        .max(12, 'Username too long')
        .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers and underscores'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
})

export const loginSchema = z.object({
    username: z.string()
        .trim()
        .min(3, 'Username must be at least 3 characters')
        .max(12, 'Username too long'),
    password: z.string().min(1, 'Password is required'),
})

export const updateStatsSchema = z.object({
    won: z.boolean(),
})