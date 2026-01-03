"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { sendPatientData } from "@/api/sendPatientData";

const formSchema = z.object({
    age: z.string().nonempty("Age is required"),
    gender: z.string(),
    skinType: z.string(),
    familyHistory: z.string(),
    pregnant: z.string().optional(),
    duration: z.string(),
    severity: z.number(),
    itching: z.string(),
    pain: z.string(),
    discharge: z.string(),
    sunExposure: z.string(),
    stress: z.string(),
    irritants: z.string(),
    treatments: z.string(),
});

export default function PatientForm({ formValues, setFormValues, setCurrentStep }) {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...formValues, // <-- ensures sync with parent state
            severity: formValues.severity ?? 5,
        },
    });

    async function onSubmit(values) {
        const mergedValues = { ...formValues, ...values }; // prepare fresh data
      
        setFormValues(mergedValues); // update state for UI
        setLoading(true);
      
        try {
          const response = await sendPatientData(mergedValues);
      
          setFormValues((prev) => ({
            ...prev,
            suggestion: response.message || response.suggestion || "No remedies.",
          }));
      
          setTimeout(() => setCurrentStep((prev) => prev + 1), 0);
        } catch (err) {
          console.error("Failed to send patient data:", err);
        } finally {
          setLoading(false);
        }
      }
      


    return (
        <div className="w-full h-full max-w-full mx-auto p-2 rounded-lg overflow-y-auto">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <Loader2 className="animate-spin h-6 w-6 text-primary" />
                    <span className="ml-2">Analyzing...</span>
                </div>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Age */}
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>1. What is your age?</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter your age" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Gender */}
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>2. What is your gender?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Skin Type */}
                        <FormField
                            control={form.control}
                            name="skinType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>3. How would you describe your skin type?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select skin type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="oily">Oily</SelectItem>
                                            <SelectItem value="dry">Dry</SelectItem>
                                            <SelectItem value="normal">Normal</SelectItem>
                                            <SelectItem value="combination">Combination</SelectItem>
                                            <SelectItem value="sensitive">Sensitive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Family History */}
                        <FormField
                            control={form.control}
                            name="familyHistory"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>4. Family history of skin disease?</FormLabel>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                                        <div className="flex gap-4">
                                            <RadioGroupItem value="yes" id="fh-yes" />
                                            <label htmlFor="fh-yes">Yes</label>
                                            <RadioGroupItem value="no" id="fh-no" />
                                            <label htmlFor="fh-no">No</label>
                                        </div>
                                    </RadioGroup>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Pregnant (only for females) */}
                        <FormField
                            control={form.control}
                            name="pregnant"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>5. Are you currently pregnant?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="yes">Yes</SelectItem>
                                            <SelectItem value="no">No</SelectItem>
                                            <SelectItem value="not-sure">Not Sure</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Duration */}
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>6. Duration of problem?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select duration" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="<1w">&lt;1 week</SelectItem>
                                            <SelectItem value="1-4w">1–4 weeks</SelectItem>
                                            <SelectItem value="1-3m">1–3 months</SelectItem>
                                            <SelectItem value="3-6m">3–6 months</SelectItem>
                                            <SelectItem value="6m-1y">&gt;6 months</SelectItem>
                                            <SelectItem value=">1y">&gt;1 year</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Severity Slider */}
                        <FormField
                            control={form.control}
                            name="severity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>7. Severity (0–10)</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-4">
                                            {/* Slider */}
                                            <Slider
                                                min={0}
                                                max={10}
                                                step={1}
                                                value={[field.value || 5]} // controlled slider
                                                onValueChange={(val) => field.onChange(val[0])}
                                                className="flex-1"
                                            />

                                            {/* Live Value Display */}
                                            <span className="text-sm font-medium w-6 text-center">
                                                {field.value ?? 5}
                                            </span>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        {/* Itching */}
                        <FormField
                            control={form.control}
                            name="itching"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>8. Itching severity</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="mild">Mild</SelectItem>
                                            <SelectItem value="moderate">Moderate</SelectItem>
                                            <SelectItem value="severe">Severe</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Pain */}
                        <FormField
                            control={form.control}
                            name="pain"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>9. Do you experience pain/burning?</FormLabel>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                                        <div className="flex gap-4">
                                            <RadioGroupItem value="yes" id="pain-yes" />
                                            <label htmlFor="pain-yes">Yes</label>
                                            <RadioGroupItem value="no" id="pain-no" />
                                            <label htmlFor="pain-no">No</label>
                                        </div>
                                    </RadioGroup>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Discharge */}
                        <FormField
                            control={form.control}
                            name="discharge"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>10. Any discharge?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select discharge type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="pus">Pus</SelectItem>
                                            <SelectItem value="bleeding">Bleeding</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Sun Exposure */}
                        <FormField
                            control={form.control}
                            name="sunExposure"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>11. Sun exposure level</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select exposure" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="moderate">Moderate</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Stress */}
                        <FormField
                            control={form.control}
                            name="stress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>12. Stress level</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select stress level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="moderate">Moderate</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Irritants */}
                        <FormField
                            control={form.control}
                            name="irritants"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>13. Frequent contact with irritants?</FormLabel>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                                        <div className="flex gap-4">
                                            <RadioGroupItem value="yes" id="irritants-yes" />
                                            <label htmlFor="irritants-yes">Yes</label>
                                            <RadioGroupItem value="no" id="irritants-no" />
                                            <label htmlFor="irritants-no">No</label>
                                        </div>
                                    </RadioGroup>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Treatments */}
                        <FormField
                            control={form.control}
                            name="treatments"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>14. Treatments tried so far</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select treatment type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="otc">OTC only</SelectItem>
                                            <SelectItem value="topicals">Topicals tried</SelectItem>
                                            <SelectItem value="systemics">Systemics</SelectItem>
                                            <SelectItem value="phototherapy">Phototherapy</SelectItem>
                                            <SelectItem value="mixed">Mixed / Unknown</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" className="w-10 h-10 rounded-full absolute bottom-1.5 right-4">
                            <ArrowRight className="size-4" />
                        </Button>
                    </form>
                </Form>)
            }
        </div >
    );
}
