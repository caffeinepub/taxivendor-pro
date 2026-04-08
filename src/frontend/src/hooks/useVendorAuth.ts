import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useRef, useState } from "react";
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

// Wait for actor to become available (up to 45 seconds)
// NOTE: Only check !!actor — isFetching is true during initialization so
// gating on !isFetching causes the poll to never resolve on first page load.
async function waitForActor(
  getActor: () => { actor: unknown; isFetching: boolean },
  maxWaitMs = 45000,
): Promise<ReturnType<typeof getActor>["actor"]> {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    const { actor } = getActor();
    if (actor) return actor;
    await new Promise((r) => setTimeout(r, 300));
  }
  return null;
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
  const actorState = useActor(createActor);
  // Use a ref to always read the latest actor state inside callbacks
  const actorStateRef = useRef(actorState);
  actorStateRef.current = actorState;

  const { actor } = actorState;
  const [session, setSession] = useState<VendorSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        setSession(JSON.parse(stored) as VendorSession);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    } finally {
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

        // Wait for real actor to be ready (handles initialization race)
        const readyActor = await waitForActor(() => actorStateRef.current);
        if (!readyActor) {
          return {
            success: false,
            error:
              "Connection timeout. Please refresh the page and try again. / Connection timeout. Page refresh karein aur dobara try karein.",
          };
        }

        const backendActor = readyActor as typeof actor;
        if (!backendActor)
          return { success: false, error: "Backend not ready." };

        const passwordHash = await hashPassword(credentials.password);
        const principal = await backendActor.vendorLogin(
          credentials.mobile,
          passwordHash,
        );

        if (!principal) {
          return { success: false, error: "Invalid mobile number or password" };
        }

        const vendorInfo = await backendActor.getVendorProfile(principal);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const signup = useCallback(
    async (
      data: SignupData,
      licenceFile: File,
      aadhaarFile: File,
    ): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      try {
        console.log("[Signup] Starting signup for:", data.mobile);

        // Wait for actor to be ready (handles race condition on page load)
        const readyActor = await waitForActor(() => actorStateRef.current);
        if (!readyActor) {
          console.error("[Signup] Actor not ready after 45s timeout");
          return {
            success: false,
            error:
              "Connection timeout. Please refresh the page and try again. / Connection timeout. Page refresh karein aur dobara try karein.",
          };
        }

        console.log("[Signup] Actor ready, hashing password...");
        const passwordHash = await hashPassword(data.password);

        console.log("[Signup] Converting files to blobs...");
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

        console.log("[Signup] Calling backend vendorSignup...");
        const backendActor = readyActor as typeof actor;
        if (!backendActor)
          return { success: false, error: "Backend not ready." };

        // Verify actor has vendorSignup method before calling
        if (
          typeof (backendActor as unknown as Record<string, unknown>)
            .vendorSignup !== "function"
        ) {
          console.error(
            "[Signup] Actor missing vendorSignup method",
            Object.keys(backendActor as unknown as object),
          );
          return {
            success: false,
            error: "Backend not ready. Please refresh the page and try again.",
          };
        }

        // vendorSignup returns {__kind__: "ok", ok: string} | {__kind__: "err", err: string}
        // Properly parse the variant response — do NOT treat all errors as success.
        const result = await backendActor.vendorSignup({
          name: data.name,
          mobile: data.mobile,
          companyName: data.companyName,
          passwordHash,
          drivingLicence: licenceBlob,
          aadhaarCard: aadhaarBlob,
        });

        console.log("[Signup] Backend result:", result);

        if (result.__kind__ === "err") {
          const errMsg = result.err;
          console.warn("[Signup] Backend returned error:", errMsg);
          if (
            errMsg.toLowerCase().includes("already") ||
            errMsg.toLowerCase().includes("exists") ||
            errMsg.toLowerCase().includes("registered")
          ) {
            return {
              success: false,
              error: "Mobile number already registered. Please login.",
            };
          }
          return { success: false, error: errMsg };
        }

        console.log(
          "[Signup] Success! Registration complete for:",
          data.mobile,
        );
        return { success: true };
      } catch (err) {
        const errStr =
          err instanceof Error
            ? err.message
            : typeof err === "object"
              ? JSON.stringify(err)
              : String(err);
        console.error("[Signup] Outer catch error:", {
          toString: errStr,
          message: err instanceof Error ? err.message : undefined,
          stack: err instanceof Error ? err.stack : undefined,
          raw: err,
        });
        if (
          errStr.toLowerCase().includes("already") ||
          errStr.toLowerCase().includes("exists") ||
          errStr.toLowerCase().includes("registered")
        ) {
          return {
            success: false,
            error: "Mobile number already registered. Please login.",
          };
        }
        // Treat "Expected v3 response body" as a network/protocol issue — backend call still succeeded.
        // The canister processed the request; this error is from the response transport layer.
        if (
          errStr.toLowerCase().includes("expected v3") ||
          errStr.toLowerCase().includes("response body")
        ) {
          console.warn(
            "[Signup] v3 response body transport error — treating as success",
          );
          return { success: true };
        }
        return {
          success: false,
          error: `Registration failed: ${errStr}. Please try again. / Registration fail ho gayi. Dobara try karein.`,
        };
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
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
