import { createContext, useState } from "react";
import { defaultValues } from "@/config/config";

export const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
    const [formValues, setFormValues] = useState(defaultValues);

    return (
        <FormContext.Provider value={{ formValues, setFormValues }}>
            {children}
        </FormContext.Provider>

    )
}