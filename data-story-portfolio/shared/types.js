import { z } from "zod";
// Skill Schema
export const SkillSchema = z.object({
    name: z.string(),
    proficiency: z.number().min(0).max(1),
    projects: z.array(z.string().uuid()),
});
// Project Schema
export const ProjectSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    imageUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    codeUrl: z.string().url().optional(),
});
// Education Schema
export const EducationSchema = z.object({
    degree: z.string(),
    university: z.string(),
    graduationYear: z.number().min(1900).max(2100),
});
// Work Experience Schema
export const WorkExperienceSchema = z.object({
    company: z.string(),
    role: z.string(),
    duration: z.string(),
    responsibilities: z.array(z.string()),
});
// Personal Data Schema
export const PersonalDataSchema = z.object({
    name: z.string(),
    location: z.string(),
    email: z.string().email(),
    education: z.array(EducationSchema),
    skills: z.array(SkillSchema),
    projects: z.array(ProjectSchema),
    workExperience: z.array(WorkExperienceSchema),
    careerGoals: z.string(),
    interests: z.array(z.string()),
});
// AI Chat Schema
export const AIChatSchema = z.object({
    question: z.string(),
    answer: z.string(),
});
