"use client";

import React from "react";
import Dropzone, { DropzoneProps } from "react-dropzone";
import { ArrowUp, CloudUpload, Plus, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadCardProps extends React.HTMLAttributes<HTMLDivElement> {
  handleUploadFiles: (acceptedFiles: File[]) => void;
  /**
   * Accepted file types for the uploader.
   * @type { [key: string]: string[]}
   * @default
   * ```ts
   * { "image/*": [] }
   * ```
   * @example accept={["image/png", "image/jpeg"]}
   */
  accept?: DropzoneProps["accept"];
  /**
   * Maximum file size for the uploader.
   * @type number | undefined
   * @default 1024 * 1024 * 2 // 2MB
   * @example maxSize={1024 * 1024 * 2} // 2MB
   */
  maxSize?: DropzoneProps["maxSize"];
  /**
   * Maximum number of files for the uploader.
   * @type number | undefined
   * @default 1
   * @example maxFiles={5}
   */
  maxFiles?: DropzoneProps["maxFiles"];

  /**
   * Whether the uploader is disabled.
   * @type boolean
   * @default false
   * @example disabled
   */
  disabled?: boolean;

  /**
   * Whether the uploader should accept multiple files.
   * @type boolean
   * @default false
   * @example multiple
   */
  multiple?: boolean;

  CustomIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

function FileUploadCard(props: FileUploadCardProps) {
  const {
    handleUploadFiles = (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
    },
    accept = { "application/pdf": [] },
    maxSize = 5 * 1024 * 1024,
    maxFiles = Infinity,
    multiple = false,
    disabled = false,
    className,
    CustomIcon,
    ...dropzoneProps
  } = props;
  // const { updateIsUploading, updateAcceptedFiles, updateUploadProgress, updateUploadStatus } =
  //   useContext<FileUploadContext>(FileUploadContext)

  return (
    <Dropzone
      multiple={maxFiles > 1 || multiple}
      onDrop={handleUploadFiles}
      maxFiles={maxFiles}
      maxSize={maxSize}
      disabled={disabled}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={cn(
            `flex flex-col border bg-card p-4 text-card-foreground ${
              CustomIcon
                ? "rounded-md shadow hover:bg-gray-50"
                : "rounded-lg border-dashed border-primary md:p-6"
            }`,
            className
          )}
        >
          <input {...getInputProps()} disabled={disabled} />
          <label
            htmlFor="dropzone-file"
            className="flex h-full flex-col hover:cursor-pointer"
            onClick={(e) => e.preventDefault()}
          >
            {/* Header */}
            {CustomIcon ? (
              <div className="mt-[25%]">
                <div className="mx-auto w-fit rounded-md bg-sky-100 p-4">
                  <CustomIcon className="size-16 text-primary" />
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <div className="flex size-12 items-center justify-center rounded-full bg-background">
                  <CloudUpload className="size-6" />
                </div>
                <div
                  onClick={() => {}}
                  className="flex size-12 items-center justify-center rounded-full bg-primary/10 p-0 transition-all hover:bg-primary/30"
                >
                  <Plus className="size-6" />
                </div>
              </div>
            )}
            {/* content */}
            <div
              className={`flex flex-col justify-between gap-1 ${
                CustomIcon && "mt-5"
              }`}
            >
              <h4 className="select-none text-[0.875rem] text-card-foreground md:text-[1rem]">
                Upload a file or drag and drop here
              </h4>
              <p className="select-none text-[0.75rem] text-inactive md:text-[0.875rem]">
                Upload file types: .pdf, .doc, .docx, .csv, .json
              </p>
              <p className="select-none text-[0.75rem] text-inactive md:text-[0.875rem]">
                Max file size : {maxSize / 1024 / 1024} MB
              </p>
            </div>
            <input
              {...getInputProps}
              type="file"
              id="dropzone-file"
              className="hidden"
            />
          </label>
        </div>
      )}
    </Dropzone>
  );
}
export default FileUploadCard;
