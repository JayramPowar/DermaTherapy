import { Error } from "@/views/ErrorPage";
import { SignUpPage } from "@/views/SignUpPage";
import { SignInPage } from "@/views/SignInPage";
import App from "@/App"
import { Home } from "@/views/HomePage";
import { Approval } from "@/views/ApprovalPage";
import { Process } from "@/views/ProcessPage";
import { createBrowserRouter } from "react-router";
import { Record } from "@/views/RecordPage";


const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "home",
                element: <Home />
            },
            {
                path: "approval",
                element: <Approval />
            },
            {
                path: "record",
                element: <Record />
            }, 
            {
                path: "process",
                element: <Process />
            }
        ]
    },
    {
        path: "sign-in",
        element: <SignInPage />
    },
    {
        path: "sign-up",
        element: <SignUpPage />
    },
];

export const Router = createBrowserRouter(routes);