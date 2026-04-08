import { Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface AppTheme {
  id: string;
  name: string;
  primary: string;
  ring: string;
  previewColor: string;
}

export const APP_THEMES: AppTheme[] = [
  {
    id: "saffron",
    name: "Saffron",
    primary: "0.65 0.2 50",
    ring: "0.65 0.2 50",
    previewColor: "#E8852A",
  },
  {
    id: "royal-blue",
    name: "Royal Blue",
    primary: "0.5 0.2 240",
    ring: "0.5 0.2 240",
    previewColor: "#2B4FCC",
  },
  {
    id: "forest-green",
    name: "Forest Green",
    primary: "0.5 0.18 145",
    ring: "0.5 0.18 145",
    previewColor: "#2A7A3A",
  },
  {
    id: "sunset-pink",
    name: "Sunset Pink",
    primary: "0.65 0.22 10",
    ring: "0.65 0.22 10",
    previewColor: "#D94060",
  },
  {
    id: "purple-royal",
    name: "Purple",
    primary: "0.55 0.25 290",
    ring: "0.55 0.25 290",
    previewColor: "#7B42CC",
  },
];

const STORAGE_KEY = "app_theme";

export function applyTheme(themeId: string) {
  const theme = APP_THEMES.find((t) => t.id === themeId) ?? APP_THEMES[0];
  const root = document.documentElement;
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--ring", theme.ring);
  root.style.setProperty("--sidebar-primary", theme.primary);
  root.style.setProperty("--chart-1", theme.primary);
  localStorage.setItem(STORAGE_KEY, themeId);
}

export function loadSavedTheme() {
  const saved = localStorage.getItem(STORAGE_KEY) ?? "saffron";
  applyTheme(saved);
}

interface ThemeSwitcherProps {
  /** When true, shows theme swatches inline (expanded mode for admin panel) */
  showLabel?: boolean;
}

export default function ThemeSwitcher({ showLabel }: ThemeSwitcherProps) {
  const [activeTheme, setActiveTheme] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) ?? "saffron",
  );
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (themeId: string) => {
    setActiveTheme(themeId);
    applyTheme(themeId);
    setOpen(false);
  };

  // Inline expanded view — used in admin panel
  if (showLabel) {
    return (
      <div className="flex flex-wrap gap-3" data-ocid="theme-inline-picker">
        {APP_THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => handleSelect(theme.id)}
            aria-label={`${theme.name} theme`}
            data-ocid={`theme-inline-${theme.id}`}
            className="flex flex-col items-center gap-1.5 group"
          >
            <span
              className="w-9 h-9 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 block"
              style={{
                backgroundColor: theme.previewColor,
                borderColor:
                  activeTheme === theme.id ? theme.previewColor : "transparent",
                boxShadow:
                  activeTheme === theme.id
                    ? `0 0 0 2px white, 0 0 0 4px ${theme.previewColor}`
                    : "none",
              }}
            />
            <span
              className={`text-xs font-medium transition-colors ${activeTheme === theme.id ? "text-foreground" : "text-muted-foreground"}`}
            >
              {theme.name}
            </span>
          </button>
        ))}
      </div>
    );
  }

  // Compact header button with popup
  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change theme"
        data-ocid="theme-switcher-btn"
        className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
      >
        <Palette className="w-4 h-4" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-11 z-[9999] bg-card border border-border rounded-lg shadow-elevated p-3"
          data-ocid="theme-popup"
        >
          <p className="text-xs font-semibold text-muted-foreground mb-2 px-1">
            Theme
          </p>
          <div className="flex gap-2">
            {APP_THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelect(theme.id)}
                title={theme.name}
                aria-label={`${theme.name} theme`}
                data-ocid={`theme-${theme.id}`}
                className="relative w-7 h-7 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1"
                style={{
                  backgroundColor: theme.previewColor,
                  borderColor:
                    activeTheme === theme.id
                      ? theme.previewColor
                      : "transparent",
                  boxShadow:
                    activeTheme === theme.id
                      ? `0 0 0 2px white, 0 0 0 4px ${theme.previewColor}`
                      : "none",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
