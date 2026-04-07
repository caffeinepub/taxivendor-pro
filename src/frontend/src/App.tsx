import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import LoadingSpinner from "./components/LoadingSpinner";
import { useVendorAuth } from "./hooks/useVendorAuth";

const Home = lazy(() => import("./pages/Home"));
const SignupPage = lazy(() => import("./pages/Signup"));
const LoginPage = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const BookingsPage = lazy(() => import("./pages/Bookings"));
const BookingDetail = lazy(() => import("./pages/BookingDetail"));
const BookingFormPage = lazy(() => import("./pages/BookingForm"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const AdminPanel = lazy(() => import("./pages/admin/AdminPanel"));
const AdminApplications = lazy(() => import("./pages/admin/AdminApplications"));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings"));
const AdminFacilities = lazy(() => import("./pages/admin/AdminFacilities"));

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: () => {
    const { session, isInitialized } = useVendorAuth();
    // Wait for localStorage session restore before redirecting — prevents flicker
    if (!isInitialized) {
      return <div className="min-h-screen bg-background" aria-hidden="true" />;
    }
    if (session)
      return <Navigate to={session.isAdmin ? "/admin" : "/dashboard"} />;
    return <Navigate to="/login" />;
  },
});

const signupRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/signup",
  component: () => {
    const { session, isInitialized } = useVendorAuth();
    if (!isInitialized)
      return <div className="min-h-screen bg-background" aria-hidden="true" />;
    if (session) return <Navigate to="/dashboard" />;
    return (
      <Suspense fallback={<LoadingSpinner size="lg" fullPage />}>
        <SignupPage />
      </Suspense>
    );
  },
});

const loginRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/login",
  component: () => {
    const { session, isInitialized } = useVendorAuth();
    if (!isInitialized)
      return <div className="min-h-screen bg-background" aria-hidden="true" />;
    if (session)
      return <Navigate to={session.isAdmin ? "/admin" : "/dashboard"} />;
    return (
      <Suspense fallback={<LoadingSpinner size="lg" fullPage />}>
        <LoginPage />
      </Suspense>
    );
  },
});

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/home",
  component: () => (
    <Suspense fallback={<LoadingSpinner size="lg" fullPage />}>
      <Home />
    </Suspense>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard",
  component: () => {
    const { isLoggedIn, isInitialized } = useVendorAuth();
    if (!isInitialized)
      return <div className="min-h-screen bg-background" aria-hidden="true" />;
    if (!isLoggedIn) return <Navigate to="/login" />;
    return (
      <Suspense fallback={<LoadingSpinner size="lg" fullPage />}>
        <Dashboard />
      </Suspense>
    );
  },
});

const bookingsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/bookings",
  component: () => {
    const { isLoggedIn, isInitialized } = useVendorAuth();
    if (!isInitialized)
      return <div className="min-h-screen bg-background" aria-hidden="true" />;
    if (!isLoggedIn) return <Navigate to="/login" />;
    return (
      <Suspense fallback={<LoadingSpinner size="lg" fullPage />}>
        <BookingsPage />
      </Suspense>
    );
  },
});

const bookingFormRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/bookings/new",
  component: () => {
    const { isLoggedIn, isInitialized } = useVendorAuth();
    if (!isInitialized)
      return <div className="min-h-screen bg-background" aria-hidden="true" />;
    if (!isLoggedIn) return <Navigate to="/login" />;
    return (
      <Suspense fallback={<LoadingSpinner size="lg" fullPage />}>
        <BookingFormPage />
      </Suspense>
    );
  },
});

const bookingDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/bookings/$id",
  component: () => {
    const { isLoggedIn, isInitialized } = useVendorAuth();
    if (!isInitialized)
      return <div className="min-h-screen bg-background" aria-hidden="true" />;
    if (!isLoggedIn) return <Navigate to="/login" />;
    return (
      <Suspense fallback={<LoadingSpinner size="lg" fullPage />}>
        <BookingDetail />
      </Suspense>
    );
  },
});

const profileRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/profile",
  component: () => {
    const { isLoggedIn, isInitialized } = useVendorAuth();
    if (!isInitialized)
      return <div className="min-h-screen bg-background" aria-hidden="true" />;
    if (!isLoggedIn) return <Navigate to="/login" />;
    return (
      <Suspense fallback={<LoadingSpinner size="lg" fullPage />}>
        <ProfilePage />
      </Suspense>
    );
  },
});

const adminRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/admin",
  component: () => {
    const { isLoggedIn, isAdmin, isInitialized } = useVendorAuth();
    if (!isInitialized)
      return <div className="min-h-screen bg-background" aria-hidden="true" />;
    if (!isLoggedIn) return <Navigate to="/login" />;
    if (!isAdmin) return <Navigate to="/dashboard" />;
    return (
      <Suspense fallback={<LoadingSpinner size="lg" fullPage />}>
        <AdminPanel />
      </Suspense>
    );
  },
});

const adminApplicationsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/admin/applications",
  component: () => {
    const { isLoggedIn, isAdmin, isInitialized } = useVendorAuth();
    if (!isInitialized)
      return <div className="min-h-screen bg-background" aria-hidden="true" />;
    if (!isLoggedIn) return <Navigate to="/login" />;
    if (!isAdmin) return <Navigate to="/dashboard" />;
    return (
      <Suspense fallback={<LoadingSpinner size="lg" fullPage />}>
        <AdminApplications />
      </Suspense>
    );
  },
});

const adminBookingsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/admin/bookings",
  component: () => {
    const { isLoggedIn, isAdmin, isInitialized } = useVendorAuth();
    if (!isInitialized)
      return <div className="min-h-screen bg-background" aria-hidden="true" />;
    if (!isLoggedIn) return <Navigate to="/login" />;
    if (!isAdmin) return <Navigate to="/dashboard" />;
    return (
      <Suspense fallback={<LoadingSpinner size="lg" fullPage />}>
        <AdminBookings />
      </Suspense>
    );
  },
});

const adminFacilitiesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/admin/facilities",
  component: () => {
    const { isLoggedIn, isAdmin, isInitialized } = useVendorAuth();
    if (!isInitialized)
      return <div className="min-h-screen bg-background" aria-hidden="true" />;
    if (!isLoggedIn) return <Navigate to="/login" />;
    if (!isAdmin) return <Navigate to="/dashboard" />;
    return (
      <Suspense fallback={<LoadingSpinner size="lg" fullPage />}>
        <AdminFacilities />
      </Suspense>
    );
  },
});

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    indexRoute,
    signupRoute,
    loginRoute,
    homeRoute,
    dashboardRoute,
    bookingsRoute,
    bookingFormRoute,
    bookingDetailRoute,
    profileRoute,
    adminRoute,
    adminApplicationsRoute,
    adminBookingsRoute,
    adminFacilitiesRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
