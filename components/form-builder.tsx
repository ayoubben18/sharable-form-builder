"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlignLeftIcon,
  CalendarIcon,
  CheckSquareIcon,
  ChevronDownIcon,
  Grip,
  HashIcon,
  ListIcon,
  PlusCircle,
  TextCursorInput,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { Fragment, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { formSchema, FormType } from "@/types/form-types";
import FileUploadCard from "./file-upload-card";
import { useFormStore } from "@/stores/useFormStore";
import { useRouter } from "next/navigation";

const FieldTypes = {
  text: "Text",
  textarea: "Text Area",
  checkbox: "Check Box",
  date: "Date",
  number: "Number",
  select: "Select Field",
} as const;

const getIcon = (type: keyof typeof FieldTypes) => {
  switch (type) {
    case "text":
      return TextCursorInput;
    case "textarea":
      return AlignLeftIcon;
    case "checkbox":
      return CheckSquareIcon;
    case "date":
      return CalendarIcon;
    case "number":
      return HashIcon;
    case "select":
      return ListIcon;
    default:
      return null;
  }
};

function FormBuilder() {
  const router = useRouter();
  const [opened, setOpened] = useState<boolean>(false);
  const { form: formStore, setForm } = useFormStore();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fields: [
        {
          id: "_1",
          name: "Full name",
          type: "text",
          description: "Enter your full name here",
          required: true,
          format: "string",
        },
      ],
    },
  });
  const [expandedField, setExpandedField] = useState<number | null>(0);

  const { fields, append, remove, move, update } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const handleAddField = (type: keyof typeof FieldTypes) => {
    append({ name: "", type, required: false, id: `_${fields.length + 1}` });
  };

  const handleValidate = async (data: FormType) => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("Code generated successfully!");
      }, 1500);
    });
    data.fields.forEach((field, index) => ({
      ...field,
      id: `_${index + 1}`,
    }));
    setForm(data);
    router.push("/preview");
  };

  async function onSubmit(data: FormType) {
    toast.promise(handleValidate(data), {
      loading: "Generating code...",
      success: "Code generated successfully!",
      error: "Failed to generate code.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Card className="w-full">
          <CardHeader className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <CardTitle>Form Builder</CardTitle>
              <p className="text-sm text-muted-foreground">
                Create a form to collect information from people.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <FormField
                control={form.control}
                name={`formTitle`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Form Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Form Title"
                        className="max-w-2xl"
                      />
                    </FormControl>
                    <FormMessage className="-bottom-5 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`formDescription`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Form Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Form Description"
                        className="max-w-2xl"
                      />
                    </FormControl>
                    <FormMessage className="-bottom-5 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`includeFileUpload`}
                render={({ field }) => (
                  <FormItem className="w-full flex items-center gap-2">
                    <FormLabel>Include File Upload</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="h-7 w-7 rounded-md"
                      />
                    </FormControl>
                    <FormMessage className="-bottom-5 text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              {" "}
              <DropdownMenu open={opened} onOpenChange={setOpened}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[140px] justify-between"
                  >
                    Add field
                    <ChevronDownIcon
                      className={cn(
                        "ml-2 h-4 w-4 transition-transform",
                        opened ? "rotate-180" : ""
                      )}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[140px]">
                  {Object.entries(FieldTypes).map(([key, value]) => {
                    const Icon = getIcon(key as keyof typeof FieldTypes);
                    return (
                      <DropdownMenuItem
                        key={key}
                        onClick={() =>
                          handleAddField(key as keyof typeof FieldTypes)
                        }
                      >
                        {Icon && (
                          <Icon className="mr-2 h-4 w-4 text-blue-600" />
                        )}
                        <span>{value}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="editor" className="flex-1">
                  Editor
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex-1">
                  Preview
                </TabsTrigger>
              </TabsList>
              <TabsContent value="editor" className="w-full space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Move</TableHead>
                      <TableHead>Label</TableHead>
                      <TableHead className="w-[100px]">More</TableHead>
                      <TableHead className="w-[100px]">Required</TableHead>
                      <TableHead className="w-[100px]">Delete</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <Sortable
                      value={fields}
                      onDragStart={() => {
                        setExpandedField(null);
                      }}
                      onMove={({ activeIndex, overIndex }) =>
                        move(activeIndex, overIndex)
                      }
                    >
                      {fields.map((field, index) => {
                        const Icon = getIcon(field.type);
                        return (
                          <Fragment>
                            <SortableItem
                              key={field.id}
                              value={field.id}
                              asChild
                            >
                              <TableRow>
                                <TableCell>
                                  {" "}
                                  <SortableDragHandle
                                    type="button"
                                    className="cursor-grab rounded-md border-2 border-slate-200 bg-slate-50 p-2 hover:bg-slate-300"
                                  >
                                    <Grip className="h-5 w-5 text-gray-500" />
                                  </SortableDragHandle>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    {Icon && (
                                      <div className="mr-1 rounded-md bg-blue-100 p-2">
                                        <Icon className="h-5 w-5 text-blue-500" />
                                      </div>
                                    )}
                                    <FormField
                                      control={form.control}
                                      name={`fields.${index}.name`}
                                      render={({ field }) => (
                                        <FormItem className="w-full flex-1 sm:w-auto">
                                          <FormControl>
                                            <Input
                                              {...field}
                                              placeholder="Field name"
                                              className="w-full"
                                            />
                                          </FormControl>
                                          <FormMessage className="-bottom-5 text-xs" />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    size="icon"
                                    type="button"
                                    variant="ghost"
                                    onClick={() =>
                                      setExpandedField(
                                        expandedField === index ? null : index
                                      )
                                    }
                                  >
                                    <ChevronDownIcon
                                      className={cn(
                                        "h-6 w-6 text-gray-500 transition-transform",
                                        expandedField === index && "rotate-180"
                                      )}
                                    />
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <FormField
                                    control={form.control}
                                    name={`fields.${index}.required`}
                                    render={({ field }) => (
                                      <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="h-7 w-7 rounded-md"
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>
                                <TableCell>
                                  {" "}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="ml-auto"
                                  >
                                    <Trash2 className="h-6 w-6 text-red-500" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </SortableItem>
                            {expandedField === index && (
                              <TableRow>
                                <TableCell
                                  colSpan={5}
                                  className="rounded-bl-md rounded-br-md bg-gradient-to-b from-white to-muted p-4"
                                >
                                  <div className="space-y-4">
                                    {field.type === "text" && (
                                      <div>
                                        <FormField
                                          control={form.control}
                                          name={`fields.${index}.format`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>Format</FormLabel>
                                              <FormControl>
                                                <RadioGroup
                                                  {...field}
                                                  defaultValue={"string"}
                                                  onValueChange={field.onChange}
                                                  className="mt-2 flex space-x-4"
                                                >
                                                  <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                      value={"email"}
                                                    />
                                                    <Label>Email</Label>
                                                  </div>
                                                  <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                      value={"string"}
                                                    />
                                                    <Label>String</Label>
                                                  </div>
                                                  <div className="flex items-center space-x-2">
                                                    <RadioGroupItem
                                                      value={"phone_number"}
                                                    />
                                                    <Label>Phone Number</Label>
                                                  </div>
                                                </RadioGroup>
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    )}
                                    {field.type === "number" && (
                                      <div className="flex space-x-4">
                                        <div className="flex-1">
                                          <FormField
                                            control={form.control}
                                            name={`fields.${index}.min`}
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Min</FormLabel>
                                                <FormControl>
                                                  <Input
                                                    type="number"
                                                    placeholder="Min"
                                                    {...field}
                                                    className="mt-2 border-gray-300"
                                                  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        </div>
                                        <div className="flex-1">
                                          <FormField
                                            control={form.control}
                                            name={`fields.${index}.max`}
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Max</FormLabel>
                                                <FormControl>
                                                  <Input
                                                    type="number"
                                                    placeholder="Max"
                                                    {...field}
                                                    className="mt-2 border-gray-300"
                                                  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                        </div>
                                      </div>
                                    )}
                                    {field.type === "select" && (
                                      <div className="flex flex-col gap-2">
                                        <FormLabel>Options</FormLabel>
                                        {field.options?.map(
                                          (option, optionIndex) => (
                                            <FormField
                                              key={optionIndex}
                                              control={form.control}
                                              name={`fields.${index}.options.${optionIndex}.name`}
                                              render={({
                                                field: optionField,
                                              }) => (
                                                <FormItem>
                                                  <FormControl>
                                                    <div className="mt-2 flex items-center space-x-2">
                                                      <Input
                                                        {...optionField}
                                                        placeholder={`Option ${
                                                          optionIndex + 1
                                                        }`}
                                                        className="flex-grow"
                                                      />
                                                      <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                          const updatedOptions =
                                                            field.options?.filter(
                                                              (_, i) =>
                                                                i !==
                                                                optionIndex
                                                            ) || [];
                                                          update(index, {
                                                            ...form.getValues(
                                                              `fields.${index}`
                                                            ),
                                                            options:
                                                              updatedOptions,
                                                          });
                                                        }}
                                                      >
                                                        <Trash2 className="h-4 w-4" />
                                                      </Button>
                                                    </div>
                                                  </FormControl>
                                                </FormItem>
                                              )}
                                            />
                                          )
                                        )}
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="sm"
                                          className="mt-2 border-gray-200"
                                          onClick={() => {
                                            let arr = field.options || [];
                                            arr.push({
                                              name: ``,
                                              value: `_${arr.length + 1}`,
                                            });
                                            update(index, {
                                              ...form.getValues(
                                                `fields.${index}`
                                              ),
                                              options: arr,
                                            });
                                          }}
                                        >
                                          <PlusCircle className="mr-2 h-4 w-4" />
                                          Add Option
                                        </Button>
                                      </div>
                                    )}
                                    <FormField
                                      control={form.control}
                                      name={`fields.${index}.description`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Description</FormLabel>
                                          <FormControl>
                                            <Textarea
                                              {...field}
                                              placeholder="Description"
                                              className="mt-2 border-gray-300"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </Fragment>
                        );
                      })}
                    </Sortable>
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="preview" className="w-full">
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    {" "}
                    <h1 className="text-2xl font-bold">
                      {form.getValues("formTitle")}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {form.getValues("formDescription")}
                    </p>
                  </div>

                  {fields.map((field, index) => (
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`fields.${index}`}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            {formField.value.name}{" "}
                            {formField.value.required && (
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
                          <FormControl className="border-gray-400">
                            {(() => {
                              switch (formField.value.type) {
                                case "text":
                                case "number":
                                  return (
                                    <Input
                                      placeholder={`Enter ${formField.value.name}`}
                                      disabled
                                    />
                                  );
                                case "textarea":
                                  return (
                                    <Textarea
                                      placeholder={`Enter ${formField.value.name}`}
                                      disabled
                                    />
                                  );
                                case "checkbox":
                                  return (
                                    <Checkbox
                                      disabled
                                      className="ml-3 h-7 w-7 rounded-md"
                                    />
                                  );
                                case "date":
                                  return <Input type="date" disabled />;
                                case "select":
                                  return (
                                    <RadioGroup>
                                      {formField.value.options?.map(
                                        (option, optionIndex) => (
                                          <div
                                            key={optionIndex}
                                            className="flex items-center space-x-2 text-gray-400"
                                          >
                                            <RadioGroupItem
                                              value={option.value}
                                              disabled
                                            />
                                            <Label>{option.name}</Label>
                                          </div>
                                        )
                                      )}
                                    </RadioGroup>
                                  );
                                default:
                                  return null;
                              }
                            })()}
                          </FormControl>

                          <FormDescription className="text-xs text-muted-foreground">
                            {formField.value.description}
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  ))}
                  {form.getValues("includeFileUpload") && (
                    <>
                      <h1>Upload file</h1>
                      <FileUploadCard
                        disabled={true}
                        maxFiles={1}
                        handleUploadFiles={(acceptedFiles: File[]) => {
                          console.log(acceptedFiles);
                        }}
                        aria-disabled={true}
                        className="h-[15rem]"
                      />
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="mt-6 justify-end">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              // Disable this buttonwhen you perform your action
            >
              Validate
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export default FormBuilder;
