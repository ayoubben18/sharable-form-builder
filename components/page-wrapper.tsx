import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const PageWrapper = ({ className, children }: Props) => {
  return (
    <div
      className={cn("flex flex-col min-h-screen container mx-auto", className)}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
