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
            name: "Full Name",
            type: "text",
            required: true,
            description: "Enter your full name",
            format: "string",
          },
          {
            id: "_2",
            name: "What technologies are you interested in?",
            type: "select",
            required: true,
            description: "Select the technologies you are interested in",
            options: [
              { value: "_1", name: "React" },
              { value: "_2", name: "Vue" },
              { value: "_3", name: "Angular" },
            ],
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
