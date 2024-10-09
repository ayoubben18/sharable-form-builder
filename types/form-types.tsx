import { z } from "zod";

export const field = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  type: z
    .enum(["text", "textarea", "checkbox", "date", "number", "select"])
    .default("text"),
  required: z.boolean().default(false),
  description: z.string().optional(),
  min: z.coerce.number().optional(),
  max: z.coerce.number().optional(),
  format: z
    .enum(["email", "string", "phone_number"])
    .default("string")
    .optional(),
  options: z
    .array(z.object({ value: z.string(), name: z.string().min(1) }))
    .optional(),
});

export type FieldType = z.infer<typeof field>;

export const formSchema = z.object({
  formTitle: z.string().min(1),
  formDescription: z.string().optional(),
  includeFileUpload: z.boolean().default(false),
  fields: z.array(field),
});

export type FormType = z.infer<typeof formSchema>;
