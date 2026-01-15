import { z } from 'zod';

export const formSkillsInstance = z.object({
    nameSkill: z.string(),
    nameCompany: z.string(),
    dateStart: z.iso.date(),
    dateEnd: z.iso.date(),
    descriptionSkill: z.string(),
});

export type formSkillsType = z.infer<typeof formSkillsInstance>;