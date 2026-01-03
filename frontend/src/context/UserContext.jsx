import { createContext } from "react";
import { useUser } from "@clerk/clerk-react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const user = useUser();

    return (
        <UserContext.Provider value={user}>
            { children }
        </UserContext.Provider>
    )
}