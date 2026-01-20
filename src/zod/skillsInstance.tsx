import { z } from "zod";

export const skillsInstance = z.object({
    id: z.uuid('id').nonempty(),
    nameSkills: z.string().nonempty(),
    nameCompany: z.string().nonempty(),
    dateStart: z.string().nonempty(),
    dateEnd: z.string(),
    descriptionSkill: z.string(),
});

export type skillsInstanceType = z.infer<typeof skillsInstance> 