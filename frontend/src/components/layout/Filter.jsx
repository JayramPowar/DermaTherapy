import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export const Filter = ({ data, setFilteredData }) => {
    const [filter, setFilter] = useState({
            gender: "",
            severity: "",
            status: "",
        });

    const handleApplyFilter = () => {
        let filtered = data;

        if (filter.gender && filter.gender !== "all")
            filtered = filtered.filter((r) => r.gender?.toLowerCase() === filter.gender.toLowerCase());

        if (filter.status && filter.status !== "all")
            filtered = filtered.filter((r) =>
                filter.status === "approved"
                    ? r.isApproved
                    : filter.status === "pending"
                        ? !r.isApproved
                        : true
            );

        if (filter.severity && filter.severity !== "all")
            filtered = filtered.filter((r) => String(r.severity) === filter.severity);

        setFilteredData(filtered);
    };

    const handleResetFilter = () => {
        setFilter({ gender: "", severity: "", status: "" });
        setFilteredData(data);
    };
    return (
        <div className="w-full h-12 flex justify-end mb-4">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-row justify-center items-center gap-2 border px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filter
                </DropdownMenuTrigger>

                <DropdownMenuContent className="p-4 w-64 mr-8.5">
                    <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* Status Filter */}
                    <div className="flex flex-col gap-2 mb-3">
                        <label className="text-sm font-medium">Status</label>
                        <Select
                            value={filter.status}
                            onValueChange={(value) => setFilter({ ...filter, status: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Gender Filter */}
                    <div className="flex flex-col gap-2 mb-3">
                        <label className="text-sm font-medium">Gender</label>
                        <Select
                            value={filter.gender}
                            onValueChange={(value) => setFilter({ ...filter, gender: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Severity Filter */}
                    <div className="flex flex-col gap-2 mb-3">
                        <label className="text-sm font-medium">Severity (1–10)</label>
                        <Select
                            value={filter.severity}
                            onValueChange={(value) => setFilter({ ...filter, severity: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select severity" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                    <SelectItem key={num} value={String(num)}>
                                        {num}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-4">
                        <Button variant="outline" size="sm" onClick={handleResetFilter}>
                            Reset
                        </Button>
                        <Button size="sm" onClick={handleApplyFilter}>
                            Apply
                        </Button>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}