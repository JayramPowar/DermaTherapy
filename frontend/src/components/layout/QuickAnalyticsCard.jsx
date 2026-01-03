import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const QuickAnalyticsCard = ({ title, length, icon, color }) => {
    return (
        <Card className="border border-gray-300 shadow-none">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-sm font-medium">{ title }</CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <p className={`text-3xl font-bold ${color}`}>{ length }</p>
          </CardContent>
        </Card>
    )
}