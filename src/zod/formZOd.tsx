import { z } from 'zod';

export const formSignInstance = z.object({
    nameSkill: z.string(),
    nameCompany: z.string(),
    dateStart: z.iso.date(),
    dateEnd: z.iso.date(),
    descriptionSkill: z.string(),
});

export type formSignTypes = z.infer<typeof formSignInstance>;