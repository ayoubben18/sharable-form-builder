import { FieldType } from "@/types/form-types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fieldSchema = (fields: FieldType[]) => {
  const shape: Record<string, any> = {};

  fields.forEach((field, index) => {
    const fieldKey = `_${index + 1}`;
    if (field.type === "text") {
      if (field.format === "email" && field.required)
        shape[fieldKey] = z.string().email();
      else if (field.format === "email" && !field.required)
        shape[fieldKey] = z.string().email().optional();
      else
        shape[fieldKey] = field.required
          ? z.string().min(1, `${field.name} is required`)
          : z.string().optional();
    } else if (field.type === "textarea") {
      shape[fieldKey] = field.required
        ? z.string().min(1, `${field.name} is required`)
        : z.string().optional();
    } else if (field.type === "checkbox") {
      shape[fieldKey] = z.boolean().default(false);
    } else if (field.type === "date") {
      shape[fieldKey] = field.required
        ? z.date({ required_error: `Please select a date for ${field.name}` })
        : z.date().optional();
    } else if (field.type === "number") {
      if (field.min && field.max)
        shape[fieldKey] = z.coerce.number().min(field.min).max(field.max);
      else if (field.min) shape[fieldKey] = z.coerce.number().min(field.min);
      else if (field.max) shape[fieldKey] = z.coerce.number().max(field.max);
      else shape[fieldKey] = z.coerce.number();
    } else if (field.type === "select") {
      if (field.required)
        shape[fieldKey] = z
          .array(z.string())
          .min(1, `Please select at least one value`);
      else shape[fieldKey] = z.array(z.string()).optional();
    }
  });

  shape.privacy_policy = z.boolean().refine((val) => val === true, {
    message: "You must accept the Privacy Policy",
  });

  return z.object(shape);
};
