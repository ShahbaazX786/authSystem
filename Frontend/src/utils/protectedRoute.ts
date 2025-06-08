import { useNavigate } from "react-router-dom";
import type { ProtectedRouteProps } from "./types";

export const ProtectedRoute = ({
  children,
  isAuthenticated,
  user,
}: ProtectedRouteProps) => {
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/login");
  }

  if (!user.isVerified) {
    navigate("/verifyOTP");
  }

  return children;
};
