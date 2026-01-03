import { BadgeInfo, CalendarDays, BriefcaseMedical, AudioLines } from "lucide-react";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";

export const RecordDetails = ({ record }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            {/* LEFT COLUMN — Image + Info */}
            <div className="space-y-5">
                <div className="w-full h-48 rounded-lg overflow-hidden border">
                    <img
                        src={record.image}
                        alt="Disease Image"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <BadgeInfo className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">Patient:</span> {record.patientName}
                    </div>

                    <div className="flex items-center gap-2">
                        <BriefcaseMedical className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">Doctor:</span> Dr. {record.doctor}
                    </div>

                    <div className="flex items-center gap-2">
                        <AudioLines className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">Severity:</span> {record.severity}
                    </div>

                    <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">Date:</span>{" "}
                        {dayjs(record.createdAt).format("DD MMM YYYY")}
                    </div>

                    <div className="flex items-center gap-2">
                        <BadgeInfo className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">Gender:</span>{" "}
                        {record.gender === "male"
                            ? "Male"
                            : record.gender === "female"
                                ? "Female"
                                : "Other"}
                    </div>

                    <div className="flex items-center gap-2">
                        <BadgeInfo className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">Age:</span> {record.age || "N/A"} years
                    </div>

                    <div className="flex items-center gap-2">
                        <BadgeInfo className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">Skin Type:</span> {record.skinType || "N/A"}
                    </div>

                    <div className="flex items-center gap-2">
                        <BadgeInfo className="w-4 h-4 text-gray-600" />
                        <span className="font-medium">Duration:</span> {record.duration || "N/A"}
                    </div>
                </div>
            </div>


            {/* RIGHT COLUMN — Remedy + Remarks */}
            <div className="border rounded-lg p-4 h-[380px] overflow-y-auto text-sm text-gray-700 bg-muted/30 space-y-4">
                {/* Remedy Section */}
                {record.suggestion ? (
                    <div className="space-y-2">
                        <p className="font-medium">💊 Recommended Remedy:</p>
                        <div className="max-h-[160px] overflow-y-auto pr-2">
                            <ReactMarkdown>{record.suggestion}</ReactMarkdown>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No remedy provided for this case.</p>
                )}

                <div className="border-t my-2"></div>

                {/* Doctor Remark Section */}
                <div className="space-y-2">
                    <p className="font-medium">🩺 Doctor’s Remark:</p>
                    <div className="max-h-[120px] overflow-y-auto pr-2">
                        {!record.isApproved ? (
                            <p className="text-yellow-600 italic">Awaiting doctor’s review...</p>
                        ) : record.remark ? (
                            <ReactMarkdown>{record.remark}</ReactMarkdown>
                        ) : (
                            <p className="text-gray-500 italic">No remarks provided.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
