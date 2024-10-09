import DisplayResponse from "@/components/diplay-response";
import PageWrapper from "@/components/page-wrapper";
import React from "react";

const page = () => {
  return (
    <PageWrapper>
      <DisplayResponse />
      <p className="text-sm text-gray-500 font-medium text-center">
        This is the response page usually used to display the data collected
        from the form
      </p>
    </PageWrapper>
  );
};

export default page;
