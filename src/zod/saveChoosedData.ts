import z from "zod";

export const propsTechSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
});

export const TechnologiesBlockSchema = z.object({
  technologies: z.array(propsTechSchema),
});

export const IdeBlockSchema = z.object({
  IDE: z.array(propsTechSchema),
});

export const VersioningBlockSchema = z.object({
  versioning: z.array(propsTechSchema),
});

export const saveChoiceSchema = z.discriminatedUnion("table", [
  z.object({
    table: z.literal("technologies_list"),
    data: z.object({
      technologies: z.array(propsTechSchema)
    })
  }),
  z.object({
    table: z.literal("ide_list"),
    data: z.object({
      IDE: z.array(propsTechSchema)
    })
  }),
  z.object({
    table: z.literal("versioning_list"),
    data: z.object({
      versioning: z.array(propsTechSchema)
    })
  })
]);



export type techBlockType = z.infer<typeof TechnologiesBlockSchema>
export type ideBlockType = z.infer<typeof IdeBlockSchema>
export type versBlockType = z.infer<typeof VersioningBlockSchema>
export type saveChoiceType = z.infer<typeof saveChoiceSchema>
