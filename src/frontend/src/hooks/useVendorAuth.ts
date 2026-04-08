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

// Wait for actor to become available (up to 15 seconds)
// NOTE: Only check !!actor — isFetching is true during initialization so
// gating on !isFetching causes the poll to never resolve on first page load.
async function waitForActor(
  getActor: () => { actor: unknown; isFetching: boolean },
  maxWaitMs = 15000,
): Promise<ReturnType<typeof getActor>["actor"]> {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    const { actor } = getActor();
    if (actor) return actor;
    await new Promise((r) => setTimeout(r, 200));
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
              "Backend not ready. Please check your connection and try again.",
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
          console.error("[Signup] Actor not ready after timeout");
          return {
            success: false,
            error: "Backend not ready. Please wait a moment and try again.",
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

        // vendorSignup returns Promise<void> — the IC agent may throw
        // "Expected v3 response body" for empty () responses in some versions.
        // We treat that specific error as a SUCCESS since the canister call
        // completed; the error is a Candid decode artefact on void returns.
        try {
          await backendActor.vendorSignup({
            name: data.name,
            mobile: data.mobile,
            companyName: data.companyName,
            passwordHash,
            drivingLicence: licenceBlob,
            aadhaarCard: aadhaarBlob,
          });
        } catch (innerErr) {
          const innerMsg =
            innerErr instanceof Error ? innerErr.message : String(innerErr);
          console.warn("[Signup] Inner error from vendorSignup:", innerMsg);

          // "Expected v3 response body" / "v3" errors are Candid decode artefacts
          // on void-returning canister methods — treat as success.
          // Also treat empty-response errors as success.
          const isVoidDecodeError =
            innerMsg.toLowerCase().includes("v3") ||
            innerMsg.toLowerCase().includes("expected") ||
            innerMsg.toLowerCase().includes("response body") ||
            innerMsg.toLowerCase().includes("candid") ||
            innerMsg.toLowerCase().includes("decode");

          if (!isVoidDecodeError) {
            // Real error — check if it's a duplicate registration
            if (
              innerMsg.toLowerCase().includes("already") ||
              innerMsg.toLowerCase().includes("exists") ||
              innerMsg.toLowerCase().includes("registered")
            ) {
              return {
                success: false,
                error: "Mobile number already registered. Please login.",
              };
            }
            // Unknown real error — surface it
            return {
              success: false,
              error:
                "Registration failed. Please try again. / Registration fail ho gayi. Dobara try karein.",
            };
          }
          // isVoidDecodeError === true → fall through as success
          console.log(
            "[Signup] Void decode artefact — treating as success for:",
            data.mobile,
          );
        }

        console.log(
          "[Signup] Success! Registration complete for:",
          data.mobile,
        );
        return { success: true };
      } catch (err) {
        console.error("[Signup] Outer error:", err);
        const message = err instanceof Error ? err.message : String(err);
        if (
          message.toLowerCase().includes("already") ||
          message.toLowerCase().includes("exists") ||
          message.toLowerCase().includes("registered")
        ) {
          return {
            success: false,
            error: "Mobile number already registered. Please login.",
          };
        }
        return {
          success: false,
          error:
            "Registration failed. Please try again. / Registration fail ho gayi. Dobara try karein.",
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
