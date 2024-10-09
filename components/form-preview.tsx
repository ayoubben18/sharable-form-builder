"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, TriangleAlert, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FancyMultiSelect } from "@/components/ui/fancy-multi-select";
import FileUploadCard from "./file-upload-card";
import { cn, fieldSchema } from "@/lib/utils";
import { useFormStore } from "@/stores/useFormStore";
import { useRouter } from "next/navigation";
import PhoneInput from "./ui/phone-input";

const FormPreview = () => {
  const router = useRouter();
  const { form: formStore, setForm } = useFormStore();

  const [resume, setResume] = useState<{
    uploaded: boolean;
    file: File | null;
  }>({
    uploaded: false,
    file: null,
  });
  const schema = useMemo(
    () => fieldSchema(formStore?.fields!),
    [formStore?.fields]
  );
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: formStore?.fields!.reduce((acc, field) => {
      const fieldKey = field.name.replace(/\s+/g, "_").toLowerCase();
      acc[fieldKey] = field.type === "checkbox" ? false : "";
      return acc;
    }, {} as Record<string, any>),
  });

  const handleUploadResumes = (files: File[]) => {
    if (files.length === 0) return;
    if (files.length === 1) {
      setResume({ uploaded: true, file: files[0] });
    } else {
      throw new Error("Only one file can be uploaded");
    }
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (formStore?.includeFileUpload && !resume.file) {
      toast.error("Please upload a file");
      return;
    }
    toast.success("Form submitted successfully !!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{formStore?.formTitle}</h1>
          <p className="text-gray-500">{formStore?.formDescription}</p>
        </div>
        {formStore?.fields?.map((field, index) => {
          const fieldKey = `_${index + 1}`;
          return (
            <FormField
              key={fieldKey}
              control={form.control}
              name={fieldKey}
              render={({ field: formField }) => (
                <FormItem
                  className={cn(
                    "flex flex-col py-2",
                    field.type === "checkbox" && "flex-row items-center gap-2"
                  )}
                >
                  <FormLabel className="flex items-center gap-2">
                    {field.name}{" "}
                    {field.required && field.type !== "checkbox" && (
                      <TooltipProvider>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger>
                            <TriangleAlert className="size-5 text-red-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This field is required</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </FormLabel>
                  <FormControl>
                    {(() => {
                      switch (field.type) {
                        case "text":
                          if (field.format === "phone_number") {
                            return (
                              <>
                                <PhoneInput
                                  {...formField}
                                  className="max-w-xl rounded-md border-1 border-gray-300"
                                />
                                <p className="text-xs text-gray-500">
                                  You typed : {form.getValues(fieldKey)}
                                </p>
                              </>
                            );
                          } else {
                            return (
                              <Input
                                {...formField}
                                placeholder={field.name}
                                className="border-gray-300"
                              />
                            );
                          }
                        case "checkbox":
                          return (
                            <Checkbox
                              checked={formField.value}
                              onCheckedChange={formField.onChange}
                              className="size-7 rounded-md"
                            />
                          );
                        case "date":
                          return (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  type="button"
                                  className={cn(
                                    "w-full justify-start border-gray-300 text-left font-normal",
                                    !formField.value && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {formField.value ? (
                                    format(formField.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={formField.value}
                                  onSelect={formField.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          );
                        case "textarea":
                          return (
                            <Textarea
                              {...formField}
                              placeholder={field.name}
                              className="border-gray-300"
                            />
                          );
                        case "number":
                          return (
                            <Input
                              {...formField}
                              type="number"
                              min={field.min}
                              max={field.max}
                              placeholder={field.name}
                              className="border-gray-300"
                            />
                          );
                        case "select":
                          console.log();

                          return (
                            <FancyMultiSelect
                              options={
                                field.options?.map((option) => ({
                                  label: option.name,
                                  value: option.value,
                                })) || []
                              }
                              value={formField.value || []}
                              onChange={formField.onChange}
                              className="border border-gray-300"
                            />
                          );
                        default:
                          return null;
                      }
                    })()}
                  </FormControl>
                  {field.description && (
                    <FormDescription>{field.description}</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        <div className="space-y-2">
          {formStore?.includeFileUpload && (
            <>
              <FormLabel className="flex items-center gap-2">
                File Upload{" "}
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                      <TriangleAlert className="size-5 text-red-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This field is required</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FileUploadCard
                multiple={false}
                maxFiles={1}
                handleUploadFiles={handleUploadResumes}
              />
            </>
          )}
          {resume.uploaded && resume.file && (
            <div className="relative w-full max-w-xl cursor-pointer rounded-md border border-gray-300 p-4">
              <Button
                size={"icon"}
                variant={"outline"}
                className="group absolute right-2 top-2 p-1 hover:bg-red-500"
                onClick={() => setResume({ uploaded: false, file: null })}
              >
                <X className="size-4 transition-transform group-hover:rotate-90 group-hover:text-white" />
              </Button>

              <h3 className="font-semibold">Uploaded Resume:</h3>
              <p className="text-gray-700">{resume.file.name}</p>
              <p className="text-gray-500">
                {(resume.file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="privacy_policy"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start space-y-2">
              <div className="flex items-center space-x-2">
                <FormControl className="flex items-center gap-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={"size-5 rounded-sm"}
                  />
                </FormControl>
                <div className="text-sm text-gray-700">
                  I confirm that I have read the Privacy Policy
                </div>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FormPreview;
