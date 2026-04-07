import { cn } from "@/lib/utils";
import { CheckCircle, FileText, Upload, X, XCircle } from "lucide-react";
import { useRef, useState } from "react";

interface DocumentUploadProps {
  label: string;
  accept?: string;
  onUpload: (file: File, previewUrl: string) => void;
  onRemove?: () => void;
  currentUrl?: string;
  required?: boolean;
  "data-ocid"?: string;
}

type UploadState = "idle" | "uploading" | "success" | "error";

export default function DocumentUpload({
  label,
  accept = "image/*,.pdf",
  onUpload,
  onRemove,
  currentUrl,
  required,
  "data-ocid": dataOcid,
}: DocumentUploadProps) {
  const [state, setState] = useState<UploadState>(
    currentUrl ? "success" : "idle",
  );
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [fileName, setFileName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setFileName(file.name);
    setState("uploading");
    setProgress(0);

    // Simulate upload progress
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState("idle");
    setPreview(null);
    setProgress(0);
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
    onRemove?.();
  };

  return (
    <div>
      <p className="form-label">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </p>

      {state === "success" && preview ? (
        <div className="relative border border-border rounded-md overflow-hidden bg-muted/20">
          {preview.match(/\.(jpg|jpeg|png|gif|webp)/i) ? (
            <img
              src={preview}
              alt={label}
              className="w-full h-32 object-cover"
            />
          ) : (
            <div className="flex items-center gap-3 p-4">
              <FileText className="w-8 h-8 text-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {fileName || "Document"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Uploaded successfully
                </p>
              </div>
            </div>
          )}
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-card/90 rounded-sm px-2 py-1">
            <CheckCircle className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs text-accent font-medium">Verified</span>
          </div>
          {onRemove && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 left-2 w-6 h-6 rounded-full bg-destructive/90 flex items-center justify-center hover:bg-destructive transition-colors"
              aria-label="Remove document"
            >
              <X className="w-3 h-3 text-destructive-foreground" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          className={cn(
            "upload-area w-full flex flex-col items-center justify-center gap-2 text-center cursor-pointer",
            state === "uploading" && "pointer-events-none",
            state === "error" && "border-destructive",
          )}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          data-ocid={dataOcid}
        >
          {state === "uploading" ? (
            <>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Uploading... {progress}%
              </p>
            </>
          ) : state === "error" ? (
            <>
              <XCircle className="w-8 h-8 text-destructive" />
              <p className="text-sm text-destructive">
                Upload failed. Tap to retry.
              </p>
            </>
          ) : (
            <>
              <Upload className="w-7 h-7 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Tap to upload
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  JPG, PNG, PDF up to 10MB
                </p>
              </div>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
