import dayjs from "dayjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  UserRound,
  BadgeInfo,
  Dot,
  BriefcaseMedical,
  AudioLines,
} from "lucide-react";
import { RecordDetails } from "./RecordDetails";

export const RecordList = ({ filteredData }) => {
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
      {filteredData.map((record) => (
        <Dialog key={record._id}>
          <DialogTrigger asChild>
            <Card className="overflow-hidden w-full h-[300px] mx-auto flex flex-col justify-between group hover:shadow-lg transition-all duration-200 cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-lg truncate flex flex-row justify-center items-center gap-3">
                      <UserRound className="w-4 h-4" />
                      {record.patientName || "Unknown Patient"}
                    </CardTitle>
                    <p className="text-sm text-gray-600 text-center flex flex-row justify-start items-center gap-3">
                      <BadgeInfo className="w-4 h-4" />
                      <span className="flex flex-row justify-start items-center gap-1">
                        {record.gender === "male"
                          ? "Male"
                          : record.gender === "female"
                          ? "Female"
                          : "Other"}{" "}
                        <Dot className="w-4 h-4" /> {record.age} years
                      </span>
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      record.isApproved
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {record.isApproved ? "Approved" : "Pending"}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col items-center gap-3 mb-2.5">
                <div className="relative w-full h-24 overflow-hidden rounded-lg border">
                  <img
                    src={record.image}
                    alt="Record"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
                  <div className="absolute bottom-3 right-3 w-28 h-6 bg-white rounded-xl text-[12px] flex flex-row justify-center items-center gap-1.5 font-medium">
                    <AudioLines className="w-4 h-4" />
                    Severity: {record.severity}
                  </div>
                </div>
              </CardContent>

              <CardDescription className="text-sm text-gray-500 flex flex-row justify-between items-center px-6">
                {dayjs(record.createdAt).format("DD MMM YYYY, ddd")}
                <p className="font-semibold text-center flex flex-row justify-center items-center gap-2">
                  <BriefcaseMedical className="w-4 h-4" /> Dr. {record.doctor}
                </p>
              </CardDescription>
            </Card>
          </DialogTrigger>

          <DialogContent className="!max-w-6xl w-full">
            <DialogHeader>
              <DialogTitle>Record Details</DialogTitle>
              <DialogDescription>
                Review complete information about the case.
              </DialogDescription>
            </DialogHeader>
            <RecordDetails record={record} />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};
