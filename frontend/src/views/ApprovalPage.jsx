import { useLocation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { Stethoscope, User, FileText, ClipboardList } from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { sendRecordData } from "@/api/sendRecordData";
import { useNavigate } from "react-router";

export const Approval = () => {
    const { state } = useLocation();
    const formValues = state?.formValues;
    const { user } = useContext(UserContext);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const navigate = useNavigate();

    const handleApproval = async () => {
        if (!selectedDoctor) {
            alert("Please select a doctor before sending for approval.");
            return;
        }

        const data = {
            ...formValues,
            doctor: selectedDoctor,
            patientName: user.fullName,
            patientEmail: user.primaryEmailAddress.emailAddress
        };

        try {
            const response = await sendRecordData(data);

            if (response && response.status === 201) {
                alert("Form submitted successfully!");
                console.log(response.data.message);
                navigate("/home");
            } else {
                alert("Failed to submit the form.");
                console.error(response?.data?.error);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            alert("An unexpected error occurred while submitting the form.");
        }

    };

    const doctors = ["Mehta", "Sharma", "Kumar"];

    if (!formValues) {
        return (
            <section className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold text-center text-gray-600">
                    No patient data available.
                </h1>
            </section>
        );
    }

    return (
        <section className="w-full h-auto flex flex-col items-center justify-center bg-white text-black">
            <Card className="w-full h-full border border-gray-300 shadow-sm rounded-none">
                <CardHeader className="border-b border-gray-300 pb-3">
                    <CardTitle className="text-xl font-bold flex items-center gap-2 tracking-wide">
                        <ClipboardList className="size-5" />
                        Patient Case Summary
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                    {/* Patient Info Section */}
                    <section>
                        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <User className="size-5" /> Patient Information
                        </h2>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm border border-gray-200 p-3 text-start">
                            <p><strong>Name:</strong> {user.fullName || "N/A"}</p>
                            <p><strong>Age:</strong> {formValues.age || "N/A"}</p>
                            <p><strong>Gender:</strong> {formValues.gender || "N/A"}</p>
                            <p><strong>Skin Type:</strong> {formValues.skinType || "N/A"}</p>
                            <p><strong>Duration:</strong> {formValues.duration || "N/A"}</p>
                            <p><strong>Severity:</strong> {formValues.severity || "N/A"}</p>
                            <div className="flex flex-col items-start justify-start">
                                <p><strong>Images:</strong></p>
                                <img
                                    src={URL.createObjectURL(formValues.images[0].file)}
                                    alt="uploaded preview"
                                    className="w-48 h-auto object-cover rounded-md mt-2"
                                />
                            </div>

                        </div>
                    </section>

                    {/* Medical History */}
                    <section>
                        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <FileText className="size-5" /> Medical Background
                        </h2>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm border border-gray-200 p-3 text-start">
                            <p><strong>Family History:</strong> {formValues.familyHistory || "N/A"}</p>
                            <p><strong>Pregnant:</strong> {formValues.pregnant || "N/A"}</p>
                            <p><strong>Sun Exposure:</strong> {formValues.sunExposure || "N/A"}</p>
                            <p><strong>Stress:</strong> {formValues.stress || "N/A"}</p>
                            <p><strong>Irritants:</strong> {formValues.irritants || "N/A"}</p>
                            <p><strong>Previous Treatments:</strong> {formValues.treatments || "N/A"}</p>
                        </div>
                    </section>

                    {/* Symptoms */}
                    <section>
                        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <FileText className="size-5" /> Reported Symptoms
                        </h2>
                        <div className="grid grid-cols-3 gap-x-4 text-sm border border-gray-200 p-3">
                            <p><strong>Itching:</strong> {formValues.itching || "N/A"}</p>
                            <p><strong>Pain:</strong> {formValues.pain || "N/A"}</p>
                            <p><strong>Discharge:</strong> {formValues.discharge || "N/A"}</p>
                        </div>
                    </section>

                    {/* AI Suggestion */}
                    <section>
                        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <Stethoscope className="size-5" /> AI Remedy Suggestion
                        </h2>
                        <div className="border border-gray-300 p-3 text-sm max-h-[180px] overflow-y-auto bg-gray-50 text-start">
                            {formValues.suggestion ? (
                                <ReactMarkdown>{formValues.suggestion}</ReactMarkdown>
                            ) : (
                                <p className="italic text-gray-600">No AI recommendation available.</p>
                            )}
                        </div>
                    </section>
                </CardContent>

                {/* Doctor Selector */}
                <section>
                    <div className="flex justify-between items-center px-6 pt-6 border-t border-gray-300">
                        <p className="font-semibold">Select Doctor:</p>
                        <Select onValueChange={setSelectedDoctor}>
                            <SelectTrigger className="w-56 border border-black">
                                <SelectValue placeholder="Select Doctor" />
                            </SelectTrigger>
                            <SelectContent>
                                {doctors.map((doc) => (
                                    <SelectItem key={doc} value={doc} className="flex items-center gap-2">
                                        <User className="size-4" />
                                        Dr. {doc}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </section>

                <div className="border-t border-gray-300 pt-6 px-6 flex justify-center">
                    <Button
                        variant="outline"
                        className="border border-black text-black hover:bg-black hover:text-white transition font-medium px-6 py-2 rounded-none"
                        onClick={handleApproval}
                    >
                        Send for Approval
                    </Button>
                </div>
            </Card>
        </section>
    );
};

