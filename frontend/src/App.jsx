import { Protect, SignedIn, SignedOut } from '@clerk/clerk-react';
import { FormProvider } from "@/context/FormContext";
import { Outlet } from "react-router";
import { useNavigate } from 'react-router';
import { LandingPage } from '@/views/LandingPage';
import { AuthRedirect } from "@/auth/AuthRedirect";
import { UserProvider } from "@/context/UserContext";
import { Navbar } from '@/components/layout/Navbar';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecordProvider } from './context/RecordContext';
import "./App.css";

export default function App() {
  const navigate = useNavigate();
  const client = new QueryClient();

  return (
    <main className="w-full h-full flex flex-col box-content">
      <SignedOut>
        <LandingPage />
      </SignedOut>

      <SignedIn>
        <AuthRedirect />
        <Protect fallback={() => navigate("/")}>
          <QueryClientProvider client={client}>
            <UserProvider>
              <Navbar />

              <section className="h-auto w-full flex flex-col p-9">
                <RecordProvider>
                  <FormProvider>
                    <Outlet />
                  </FormProvider>
                </RecordProvider>
              </section>
            </UserProvider>
          </QueryClientProvider>
        </Protect>
      </SignedIn>
    </main>
  );
}