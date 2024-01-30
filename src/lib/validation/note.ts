import {z} from "zod"


export const createNotesSchema = z.object({
    title:z.string().min(1,{message:"title is required"}),
    content:z.string().optional(),
});

export type CreateNotesSchema = z.infer<typeof createNotesSchema>

export const updateNoteSchema = createNotesSchema.extend({
    id: z.string().min(1)
});

export const deleteNoteSchema = z.object({
    id: z.string().min(1)
});