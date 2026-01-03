import { Router } from "./Router";
import { RouterProvider } from "react-router";

export const RouteProvider = () => {
    return (
        <RouterProvider router={Router} />
    )
}