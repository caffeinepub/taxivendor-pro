import { f as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X, g as cn } from "./index-Dg4inA2B.js";
import { F as FileText } from "./file-text-DnXESsW0.js";
import { C as CircleCheckBig } from "./circle-check-big-DRwabk1o.js";
import { C as CircleX } from "./circle-x-YXb0KY8s.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function DocumentUpload({
  label,
  accept = "image/*,.pdf",
  onUpload,
  onRemove,
  currentUrl,
  required,
  "data-ocid": dataOcid
}) {
  const [state, setState] = reactExports.useState(
    currentUrl ? "success" : "idle"
  );
  const [progress, setProgress] = reactExports.useState(0);
  const [preview, setPreview] = reactExports.useState(currentUrl ?? null);
  const [fileName, setFileName] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  const handleFile = async (file) => {
    setFileName(file.name);
    setState("uploading");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + 15;
      });
    }, 100);
    try {
      const url = URL.createObjectURL(file);
      await new Promise((r) => setTimeout(r, 800));
      clearInterval(interval);
      setProgress(100);
      setState("success");
      setPreview(url);
      onUpload(file, url);
    } catch {
      clearInterval(interval);
      setState("error");
      setProgress(0);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };
  const handleRemove = (e) => {
    e.stopPropagation();
    setState("idle");
    setPreview(null);
    setProgress(0);
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
    onRemove == null ? void 0 : onRemove();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "form-label", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-0.5", children: "*" })
    ] }),
    state === "success" && preview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative border border-border rounded-md overflow-hidden bg-muted/20", children: [
      preview.match(/\.(jpg|jpeg|png|gif|webp)/i) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: preview,
          alt: label,
          className: "w-full h-32 object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8 text-primary flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: fileName || "Document" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Uploaded successfully" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 flex items-center gap-1.5 bg-card/90 rounded-sm px-2 py-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-accent font-medium", children: "Verified" })
      ] }),
      onRemove && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleRemove,
          className: "absolute top-2 left-2 w-6 h-6 rounded-full bg-destructive/90 flex items-center justify-center hover:bg-destructive transition-colors",
          "aria-label": "Remove document",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3 text-destructive-foreground" })
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: cn(
          "upload-area w-full flex flex-col items-center justify-center gap-2 text-center cursor-pointer",
          state === "uploading" && "pointer-events-none",
          state === "error" && "border-destructive"
        ),
        onClick: () => {
          var _a;
          return (_a = inputRef.current) == null ? void 0 : _a.click();
        },
        onDrop: handleDrop,
        onDragOver: (e) => e.preventDefault(),
        "data-ocid": dataOcid,
        children: state === "uploading" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-primary h-1.5 rounded-full transition-all duration-200",
              style: { width: `${progress}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Uploading... ",
            progress,
            "%"
          ] })
        ] }) : state === "error" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-destructive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: "Upload failed. Tap to retry." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-7 h-7 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Tap to upload" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "JPG, PNG, PDF up to 10MB" })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "file",
        accept,
        className: "hidden",
        onChange: (e) => {
          var _a;
          const file = (_a = e.target.files) == null ? void 0 : _a[0];
          if (file) handleFile(file);
        }
      }
    )
  ] });
}
export {
  DocumentUpload as D
};
