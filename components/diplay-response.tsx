"use client";

import { useFormStore } from "@/stores/useFormStore";
import { format } from "date-fns";

const DisplayResponse = () => {
  const { response, form } = useFormStore();

  console.log({ response, form });

  if (!response || !form.fields) {
    return null;
  }

  return (
    <div className="mt-4 divide-y divide-gray-300 rounded-md border-1 border-gray-300 p-4">
      {Object.entries(form.fields).map(([key, field]) => {
        const fieldValue = response[field.id as keyof typeof response];
        return (
          <div key={key} className="p-4">
            <h3 className="font-semibold">{field.name}</h3>
            <div>
              {(() => {
                switch (field.type) {
                  case "select":
                    return (
                      <ul className="mt-2 flex flex-col gap-1">
                        {Array.isArray(fieldValue) &&
                          fieldValue.map((answer: string) => (
                            <li key={answer}>
                              {field.options?.find(
                                (option) => option.value === answer
                              )?.name || answer}
                            </li>
                          ))}
                      </ul>
                    );
                  case "number":
                  case "text":
                  case "textarea":
                    return <p>{fieldValue}</p>;
                  case "date":
                    return fieldValue ? (
                      <p>{format(new Date(fieldValue), "MM-dd-yyyy")}</p>
                    ) : null;
                  case "checkbox":
                    return <p>{fieldValue ? "Yes" : "No"}</p>;
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayResponse;
