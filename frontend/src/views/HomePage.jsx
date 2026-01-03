import { useContext, useState, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { RecordContext } from "@/context/RecordContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import dayjs from "dayjs";
import { SkincareTipsCarousel } from "@/components/layout/Carousel";
import { QuickActions } from "@/components/layout/QuickActions";
import { QuickAnalyticsCard } from "@/components/layout/QuickAnalyticsCard";


export const Home = () => {
  const { user, isLoaded } = useContext(UserContext);
  const { data, isPending, isError } = useContext(RecordContext);
  const [pendingCases, setPendingCases] = useState([]);
  const [approvedCases, setApprovedCases] = useState([]);

  useEffect(() => {
    if (data) {
      setPendingCases(data.filter((r) => !r.isApproved));
      setApprovedCases(data.filter((r) => r.isApproved));
    }
  }, [data]);

  if (!isLoaded || isPending) {
    return (
      <section className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-xl text-center font-semibold">Loading...</h1>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-red-600">
          Error loading data.
        </h1>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen flex flex-col gap-8">
      {/* Welcome Greeting */}
      <header className="text-left flex flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.fullName || "Patient"} 👋
          </h1>
          <p className="text-gray-500 mt-2">
            Let’s continue your skincare journey — here’s your current progress.
          </p>
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </header>

      {/* Quick Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <QuickAnalyticsCard title={"Total Cases"} length={data?.length || 0} icon={<BarChart3 className="w-5 h-5 text-gray-700" />} color={"text-black"}/>
        <QuickAnalyticsCard title={"Approved"} length={approvedCases.length} icon={<CheckCircle2 className="w-5 h-5 text-green-600" />} color={"text-green-600"}/>
        <QuickAnalyticsCard title={"Pending"} length={pendingCases.length} icon={<Clock className="w-5 h-5 text-yellow-600" />}  color={"text-yellow-600"}/>
      </div>

      {/* Pending Cases Preview */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> Pending Cases
        </h2>

        {pendingCases.length === 0 ? (
          <p className="text-gray-500">No pending cases at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-start">
            {pendingCases.slice(0, 3).map((record) => (
              <Card
                key={record._id}
                className="border border-gray-300 shadow-none w-full"
              >
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    {record.patientName || "Unknown Patient"}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    Submitted on {dayjs(record.createdAt).format("DD MMM YYYY")}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Severity:{" "}
                    <span className="font-semibold">{record.severity}/10</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Doctor: Dr. {record.doctor}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Personalized Tips */}
      <SkincareTipsCarousel />
    </section>
  );
};
