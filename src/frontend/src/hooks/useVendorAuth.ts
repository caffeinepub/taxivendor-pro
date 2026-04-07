import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useState } from "react";
import { ExternalBlob, VendorStatus, createActor } from "../backend";
import type { LoginCredentials, SignupData, VendorSession } from "../types";

const SESSION_KEY = "kabgo_vendor_session";
const ADMIN_MOBILE = "7499685759";
const ADMIN_PASSWORD = "123252";

// Simple SHA-256 hash using Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export interface UseVendorAuthReturn {
  session: VendorSession | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (
    credentials: LoginCredentials,
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    data: SignupData,
    licenceFile: File,
    aadhaarFile: File,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export function useVendorAuth(): UseVendorAuthReturn {
  const { actor, isFetching } = useActor(createActor);
  const [session, setSession] = useState<VendorSession | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Only true during active login/signup calls
  const [isInitialized, setIsInitialized] = useState(false); // True after localStorage restore completes

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        setSession(JSON.parse(stored) as VendorSession);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    } finally {
      // Mark initialization complete after session restore attempt
      setIsInitialized(true);
    }
  }, []);

  const login = useCallback(
    async (
      credentials: LoginCredentials,
    ): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      try {
        // Admin check: frontend-level admin detection
        if (
          credentials.mobile === ADMIN_MOBILE &&
          credentials.password === ADMIN_PASSWORD
        ) {
          const adminSession: VendorSession = {
            id: "admin",
            name: "Admin",
            mobile: ADMIN_MOBILE,
            companyName: "TaxiVendor Pro Admin",
            status: "approved",
            isAdmin: true,
          };
          localStorage.setItem(SESSION_KEY, JSON.stringify(adminSession));
          setSession(adminSession);
          return { success: true };
        }

        // Real vendor login via backend
        if (!actor || isFetching) {
          return {
            success: false,
            error: "Backend not ready. Please try again.",
          };
        }

        const passwordHash = await hashPassword(credentials.password);
        const principal = await actor.vendorLogin(
          credentials.mobile,
          passwordHash,
        );

        if (!principal) {
          return { success: false, error: "Invalid mobile number or password" };
        }

        // Fetch vendor profile to get status and details
        const vendorInfo = await actor.getVendorProfile(principal);

        if (!vendorInfo) {
          return { success: false, error: "Vendor profile not found" };
        }

        if (vendorInfo.status === VendorStatus.pending) {
          return {
            success: false,
            error: "Your account is pending admin approval. Please wait.",
          };
        }

        if (vendorInfo.status === VendorStatus.rejected) {
          return {
            success: false,
            error: "Your account has been rejected. Contact support.",
          };
        }

        const vendorSession: VendorSession = {
          id: principal.toText(),
          name: vendorInfo.name,
          mobile: vendorInfo.mobile,
          companyName: vendorInfo.companyName,
          status: vendorInfo.status as "pending" | "approved" | "rejected",
          isAdmin: vendorInfo.mobile === ADMIN_MOBILE,
        };

        localStorage.setItem(SESSION_KEY, JSON.stringify(vendorSession));
        setSession(vendorSession);
        return { success: true };
      } catch (err) {
        console.error("Login error:", err);
        return { success: false, error: "Login failed. Please try again." };
      } finally {
        setIsLoading(false);
      }
    },
    [actor, isFetching],
  );

  const signup = useCallback(
    async (
      data: SignupData,
      licenceFile: File,
      aadhaarFile: File,
    ): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      try {
        if (!actor || isFetching) {
          return {
            success: false,
            error: "Backend not ready. Please try again.",
          };
        }

        const passwordHash = await hashPassword(data.password);

        // Convert File objects to ExternalBlob via ArrayBuffer
        const [licenceBuffer, aadhaarBuffer] = await Promise.all([
          licenceFile.arrayBuffer(),
          aadhaarFile.arrayBuffer(),
        ]);

        const licenceBlob = ExternalBlob.fromBytes(
          new Uint8Array(licenceBuffer),
        );
        const aadhaarBlob = ExternalBlob.fromBytes(
          new Uint8Array(aadhaarBuffer),
        );

        await actor.vendorSignup({
          name: data.name,
          mobile: data.mobile,
          companyName: data.companyName,
          passwordHash,
          drivingLicence: licenceBlob,
          aadhaarCard: aadhaarBlob,
        });

        return { success: true };
      } catch (err) {
        console.error("Signup error:", err);
        const message =
          err instanceof Error
            ? err.message
            : "Signup failed. Please try again.";
        if (
          message.toLowerCase().includes("already") ||
          message.toLowerCase().includes("exists")
        ) {
          return { success: false, error: "Mobile number already registered" };
        }
        return { success: false, error: message };
      } finally {
        setIsLoading(false);
      }
    },
    [actor, isFetching],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  }, []);

  return {
    session,
    isLoggedIn: session !== null,
    isAdmin: session?.isAdmin ?? false,
    isLoading,
    isInitialized,
    login,
    signup,
    logout,
  };
}
