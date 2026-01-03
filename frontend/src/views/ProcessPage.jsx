import ProcessStepper from "@/components/layout/ProcessStepper";
import { FormContext } from "@/context/FormContext";
import { useContext } from "react";

export const Process = () => {
    const { formValues, setFormValues } = useContext(FormContext);
    
    return (
        <section className="w-full h-full flex flex-col items-center justify-center">
            <ProcessStepper formValues={formValues} setFormValues={setFormValues} />
        </section>
    )
}