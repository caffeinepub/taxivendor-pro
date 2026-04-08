import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useRef, useState } from "react";
import { createActor } from "../backend";

type NotifPermission = "default" | "granted" | "denied";

const STORAGE_KEY_PERMISSION = "notif_permission";
const STORAGE_KEY_LAST_SEEN = "notif_last_seen_id";
const POLL_INTERVAL = 30_000;

function getStoredPermission(): NotifPermission {
  const stored = localStorage.getItem(STORAGE_KEY_PERMISSION);
  if (stored === "granted" || stored === "denied") return stored;
  if (typeof Notification !== "undefined") {
    return Notification.permission as NotifPermission;
  }
  return "default";
}

export function useNotifications() {
  const isSupported = typeof Notification !== "undefined";
  const { actor } = useActor(createActor);
  const [permission, setPermission] =
    useState<NotifPermission>(getStoredPermission);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const showBrowserNotification = useCallback(
    (title: string, body: string) => {
      if (!isSupported || Notification.permission !== "granted") return;
      try {
        new Notification(title, {
          body,
          icon: "/assets/images/sarthi-logo.png",
          badge: "/assets/images/sarthi-logo.png",
          tag: "sarthi-booking",
        });
      } catch {
        // Silently ignore if notification fails
      }
    },
    [isSupported],
  );

  const pollNotifications = useCallback(async () => {
    if (!actor || Notification.permission !== "granted") return;
    try {
      const notifications = await actor.getLatestNotifications();
      if (!notifications.length) return;

      const lastSeenId = localStorage.getItem(STORAGE_KEY_LAST_SEEN);
      const lastSeenBig = lastSeenId ? BigInt(lastSeenId) : BigInt(-1);

      const newOnes = notifications.filter((n) => n.id > lastSeenBig);
      if (!newOnes.length) return;

      // Show notification for the latest one
      const latest = newOnes[newOnes.length - 1];
      showBrowserNotification(
        "Sarthi Vendors - Nayi Booking",
        latest.message || "Ek nayi booking aayi hai!",
      );

      // Mark seen
      const maxId = newOnes.reduce(
        (max, n) => (n.id > max ? n.id : max),
        BigInt(0),
      );
      localStorage.setItem(STORAGE_KEY_LAST_SEEN, maxId.toString());
    } catch {
      // Silently ignore poll errors
    }
  }, [actor, showBrowserNotification]);

  const requestPermission = useCallback(async () => {
    if (!isSupported) return;
    try {
      const result = await Notification.requestPermission();
      const perm = result as NotifPermission;
      setPermission(perm);
      localStorage.setItem(STORAGE_KEY_PERMISSION, perm);
    } catch {
      setPermission("denied");
    }
  }, [isSupported]);

  // Start polling when permission granted and actor ready
  useEffect(() => {
    if (permission !== "granted" || !actor) return;

    pollNotifications();
    pollRef.current = setInterval(pollNotifications, POLL_INTERVAL);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [permission, actor, pollNotifications]);

  return { permission, requestPermission, isSupported };
}
