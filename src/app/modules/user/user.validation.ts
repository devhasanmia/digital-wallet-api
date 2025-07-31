import { z } from 'zod';

const userValidationSchema = z.object({
    name: z.string({ error: 'Name is required' }).min(1, { error: 'Name is required' }),
    email: z.email({ error: 'Invalid email address' }).min(1, { error: 'Email is required' }),
    phone: z
        .string({ error: 'Phone is required' })
        .min(1, { error: 'Phone is required' })
        .regex(/^01\d{9}$/, { error: 'Phone number must be 11 digits and start with 01' }),
    password: z.string({ error: 'Password is required' })
        .min(6, { error: 'Password must be at least 6 characters long' }),
    role: z.enum(['user', 'agent', 'admin'], {
        error: "Role must be one of 'user', 'agent', or 'admin'",
    }).default("user"),
    approvalStatus: z.enum(['pending', 'approved', 'rejected'], {
        error: "Approval status must be one of 'pending', 'approved', or 'rejected'",
    }).default('approved'),
    isBlocked: z.boolean({ error: 'isBlocked must be a boolean' }).default(false),
});

const loginSchema = userValidationSchema.pick({
    phone: true,
    password: true,
});


const AuthValidation = {
    userValidationSchema,
    loginSchema,
};

export default AuthValidation;