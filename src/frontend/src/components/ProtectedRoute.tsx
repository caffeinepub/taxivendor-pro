import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useVendorAuth } from "../hooks/useVendorAuth";
import LoadingSpinner from "./LoadingSpinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, isLoading } = useVendorAuth();

  if (isLoading) {
    return <LoadingSpinner size="lg" fullPage />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
