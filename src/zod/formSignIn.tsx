import { z } from 'zod';
import { emailUserSchema, passwordUserSchema } from './reusableSchema';

export const formSignInInstance = z.object({
    email: emailUserSchema,
    password: passwordUserSchema,
});

// Dati restituiti dal DB
export const validationUsersToDB = z.object({
    id: z.uuid().nonempty(),
    email: emailUserSchema,
    password: passwordUserSchema,
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
    emailVerified: z.boolean().nullable(),
    role: z.enum(['admin', 'user']),
});

export type formSignInType = z.infer<typeof formSignInInstance>;

// tipi inferiti ai dati restituiti dal DB
export type validationUserToDBType = z.infer<typeof validationUsersToDB>;