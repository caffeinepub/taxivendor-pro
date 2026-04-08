import { Bell, BellRing, X } from "lucide-react";
import { useRef, useState } from "react";
import { useNotifications } from "../hooks/useNotifications";

export default function NotificationBell() {
  const { permission, requestPermission, isSupported } = useNotifications();
  const [popupOpen, setPopupOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  if (!isSupported) return null;

  const handleBellClick = () => {
    if (permission === "granted") {
      setPopupOpen((o) => !o);
    } else {
      setPopupOpen((o) => !o);
    }
  };

  const handleAllow = async () => {
    await requestPermission();
    setPopupOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={handleBellClick}
        aria-label="Notifications"
        data-ocid="notification-bell"
        className="relative w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
      >
        {permission === "granted" ? (
          <BellRing className="w-4 h-4" />
        ) : (
          <Bell className="w-4 h-4" />
        )}
        {permission === "default" && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary border-2 border-card" />
        )}
      </button>

      {popupOpen && (
        <div
          className="absolute right-0 top-11 z-[9999] w-72 bg-card border border-border rounded-lg shadow-elevated p-4"
          data-ocid="notification-popup"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">
              Notifications
            </p>
            <button
              type="button"
              onClick={() => setPopupOpen(false)}
              aria-label="Close"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {permission === "default" && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Nayi booking ki turant notification paane ke liye permission de.
              </p>
              <button
                type="button"
                onClick={handleAllow}
                className="btn-primary w-full text-sm py-2"
                data-ocid="notif-allow-btn"
              >
                Allow Notifications
              </button>
            </div>
          )}

          {permission === "granted" && (
            <p className="text-xs text-muted-foreground">
              ✅ Notifications enabled hain. Nayi booking par alert aayega.
            </p>
          )}

          {permission === "denied" && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Notifications blocked hain. Browser settings mein jaake allow
                karein.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
