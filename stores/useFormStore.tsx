import { FormType } from "@/types/form-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface FormStore {
  form: FormType;
  setForm: (form: FormType) => void;
  response: any;
  setResponse: (response: any) => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      form: {
        fields: [
          {
            id: "_1",
            name: "test",
            type: "text",
            required: true,
            description: "test",
            format: "string",
          },
        ],
        formDescription: "Some random form description",
        formTitle: "Some random form title",
        includeFileUpload: false,
      },
      setForm: (form) => set({ form }),
      response: null,
      setResponse: (response) => set({ response }),
    }),
    {
      name: "form-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
