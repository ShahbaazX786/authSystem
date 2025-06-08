import { useNavigate } from "react-router-dom";
import type { RedirectAuthenticatedUserProps } from "./types";

export const RedirectAuthenticatedUser = ({
  children,
  isAuthenticated,
  user,
}: RedirectAuthenticatedUserProps) => {
  const navigate = useNavigate();
  if (isAuthenticated && user?.isVerified) {
    navigate("/");
  }

  return children;
};
