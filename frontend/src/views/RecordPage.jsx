import { useContext, useState, useEffect } from "react";
import { RecordContext } from "@/context/RecordContext";
import { Filter } from "@/components/layout/Filter";
import { RecordList } from "@/components/layout/RecordList";

export const Record = () => {
    const { data, error, isError, isPending } = useContext(RecordContext);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (data) setFilteredData(data);
    }, [data]);


    if (isPending) return <p>Loading records...</p>;
    if (isError) return <p>Error fetching records: {error?.message || "Unknown error"}</p>;
    if (!data || data.length === 0) return <p>No records found</p>;

    return (
        <section className="w-full h-full flex flex-col justify-start items-center">
            <Filter data={data} setFilteredData={setFilteredData} />
            <RecordList filteredData={filteredData}/>
        </section>
    );
};
