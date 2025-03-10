import { z } from "zod";

export const SkillSchema = z.object({
  name: z.string(),
  proficiency: z.number().min(0).max(1),
  projects: z.array(z.string().uuid())
});

export type Skill = z.infer<typeof SkillSchema>;