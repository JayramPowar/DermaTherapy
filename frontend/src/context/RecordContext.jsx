import { getRecordData } from "@/api/getRecordData";
import { useUser } from "@clerk/clerk-react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { createContext } from "react";

export const RecordContext = createContext(null);

export const RecordProvider = ({ children }) => {
    const { user } = useUser();

    const { data, error, isError, isPending } = useQuery({
        queryKey: ["records"],
        queryFn: () => getRecordData(user.primaryEmailAddress.emailAddress),
        // gcTime: 1000 -- Garbage Collection Time
        staleTime: 7000,
        refetchInterval: 7000,
        refetchIntervalInBackground: true,
        placeholderData: keepPreviousData,
    });

    return (
        <RecordContext.Provider value={{ data, error, isError, isPending }}>
            {children}
        </RecordContext.Provider>
    )
}