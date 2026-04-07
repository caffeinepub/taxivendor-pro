import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useVendorAuth } from "../hooks/useVendorAuth";
import LoadingSpinner from "./LoadingSpinner";

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isLoggedIn, isAdmin, isLoading } = useVendorAuth();

  if (isLoading) {
    return <LoadingSpinner size="lg" fullPage />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}
