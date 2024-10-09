import FormPreview from "@/components/form-preview";
import PageWrapper from "@/components/page-wrapper";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <PageWrapper className="justify-center">
      <FormPreview />
      <div className="flex justify-center mt-10">
        <Link href="/" className="underline font-bold text-gray-500">
          Back to Form Builder
        </Link>
      </div>
    </PageWrapper>
  );
};

export default page;
