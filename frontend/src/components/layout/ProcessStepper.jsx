import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ReactMarkdown from "react-markdown";
import { useNavigate } from 'react-router';

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';
import { Check, LoaderCircleIcon, ArrowRight, ArrowLeft, Image, FileText, Stethoscope } from 'lucide-react';
import GalleryUpload from '../file-upload/gallery-upload';
import PatientForm from './PatientForm';


const steps = [
  {
    title: "Upload Image",
    icon: Image,
    render: ({ formValues, setFormValues }) => (
      <GalleryUpload
        onFilesChange={(files) =>
          setFormValues((prev) => ({ ...prev, images: files }))
        }
      />
    ),
  },
  {
    title: "Describe Symptoms",
    icon: FileText,
    render: ({ formValues, setFormValues, setCurrentStep }) => (
      <PatientForm formValues={formValues} setFormValues={setFormValues} setCurrentStep={setCurrentStep} />
    ),
  },
  {
    title: "Remedy Recommendation",
    icon: Stethoscope,
    render: ({ formValues }) => (
      <div className="p-4 w-full h-full box-border rounded-lg bg-white">
        <h3 className="font-bold">AI Recommendations</h3>

        {formValues.suggestion ? (
          <div className="text-sm text-left mt-2 bg-zinc-100 p-2 rounded w-full h-[250px] overflow-y-auto">
            <ReactMarkdown>{formValues.suggestion}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm mt-2 italic text-gray-500 w-full h-[250px] overflow-y-auto">
            No suggestion available yet.
          </p>
        )}
      </div>
    ),
  }

];

const badges = [
  {
    text: "In Progress",
    variant: "primary",
    size: "sm",
    appearance: "light",
    className: "hidden group-data-[state=active]/step:inline-flex",
  },
  {
    text: "Completed",
    variant: "success",
    size: "sm",
    appearance: "light",
    className: "hidden group-data-[state=completed]/step:inline-flex",
  },
  {
    text: "Pending",
    variant: "secondary",
    size: "sm",
    className: "hidden group-data-[state=inactive]/step:inline-flex text-muted-foreground",
  },
];

export default function ProcessStpper({ formValues, setFormValues }) {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep === steps.length) {
      navigate("/approval", { state: { formValues } });
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };
  
  return (
    <Stepper
      value={currentStep}
      onValueChange={setCurrentStep}
      indicators={{
        completed: <Check className="size-4" />,
        loading: <LoaderCircleIcon className="size-4 animate-spin" />,
      }}
      className="space-y-8 w-full h-full flex flex-col justify-between items-center"
    >
      <StepperNav className="gap-3 mb-15">
        {steps.map((step, index) => {
          return (
            <StepperItem key={index} step={index + 1} className="relative flex-1 items-start">
              <StepperTrigger className="flex flex-col items-start justify-center gap-2.5 grow" asChild>
                <StepperIndicator className="size-8 border-2 data-[state=completed]:text-white data-[state=completed]:bg-green-500 data-[state=inactive]:bg-transparent data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground">
                  <step.icon className="size-4" />
                </StepperIndicator>
                <div className="flex flex-col items-start gap-1">
                  <div className="text-[10px] font-semibold uppercase text-muted-foreground">Step {index + 1}</div>
                  <StepperTitle className="text-start text-base font-semibold group-data-[state=inactive]/step:text-muted-foreground">
                    {step.title}
                  </StepperTitle>
                  <div>
                    {badges.map((badge, index) => (
                      <Badge
                        key={index}
                        variant={badge.variant}
                        size={badge.size}
                        appearance={badge.appearance}
                        className={badge.className}
                      >
                        {badge.text}
                      </Badge>
                    ))}
                  </div>
                </div>
              </StepperTrigger>

              {steps.length > index + 1 && (
                <StepperSeparator className="absolute top-4 inset-x-0 start-9 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none  group-data-[state=completed]/step:bg-green-500" />
              )}
            </StepperItem>
          );
        })}
      </StepperNav>

      <StepperPanel className={`text-sm h-full max-h-[360px] flex items-center justify-center border-2 border-zinc-200 rounded-lg py-5 px-5`}>
        {steps.map((step, index) => (
          <StepperContent key={index} value={index + 1} className="w-full h-full flex items-center justify-center relative">
            {step.render({ formValues, setFormValues, setCurrentStep })}
          </StepperContent>
        ))}
      </StepperPanel>

      <div className="flex items-center justify-between gap-8">
        <Button variant="outline" onClick={() => setCurrentStep((prev) => prev - 1)} disabled={currentStep === 1} className={"w-10 h-10 rounded-full bg-white"}>
          <ArrowLeft className="size-4" />
        </Button>
        {currentStep !== 2 && (
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={!formValues.images && currentStep !== steps.length}
            className="w-10 h-10 rounded-full bg-white"
          >
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </Stepper>
  );
}
