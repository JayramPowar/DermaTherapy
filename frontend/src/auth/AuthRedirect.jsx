import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const AuthRedirect = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const publicRoutes = ["/", "/landing"];
    
    if (isSignedIn && publicRoutes.includes(location.pathname)) {
      navigate("/home");
    }
  }, [isSignedIn, navigate]);

  return null;
};