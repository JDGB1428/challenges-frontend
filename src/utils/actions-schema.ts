import * as z from "zod";

export const DatumSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    icon: z.string(),
    color: z.string(),
    status: z.union([z.literal(0), z.literal(1)]), 
    createdAt: z.coerce.date(),
});
export type Datum = z.infer<typeof DatumSchema>;


export const DataSchema = z.object({
    pageSize: z.number(),
    pageNumber: z.number(),
    totalElements: z.number(),
    totalPages: z.number(),
    data: z.array(DatumSchema),
});
export type Data = z.infer<typeof DataSchema>;

export const WelcomeSchema = z.object({
    data: DataSchema,
});
export type Welcome = z.infer<typeof WelcomeSchema>;

export const AddSchema = z.object({
    name: z.string(),
    description: z.string(),
    color: z.string(),
    status: z.union([z.literal(0), z.literal(1)]),
    icon: z.instanceof(File), 
});
