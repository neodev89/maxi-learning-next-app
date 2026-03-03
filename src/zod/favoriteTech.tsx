import { z } from 'zod';

export const favoriteTechSchema = z.object({
    id: z.uuid().nonempty(),
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    experienceYear: z.number().nonnegative(),
    experienceMonth: z.number().nonnegative(),
    userId: z.uuid().nonempty(),
});

export type favoriteTechType = z.infer<typeof favoriteTechSchema>;

