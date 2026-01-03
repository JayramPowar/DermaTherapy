import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export const QuickActions = () => {
    const navigate = useNavigate();

    return (
        <div className="mt-10 mb-10 flex flex-wrap gap-4 justify-center">
            <Button onClick={() => navigate("/process")}>
                Analyze New Image
            </Button>
            <Button onClick={() => navigate("/record")}>
                View All Records
            </Button>
            <Button>
                Ask AI for Remedies
            </Button>
        </div>
    )
}