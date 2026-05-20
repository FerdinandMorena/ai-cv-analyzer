import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      setSelectedFile(file);
      onFileSelect?.(file);
    },
    [onFileSelect],
  );

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    onFileSelect?.(null);
  }, [onFileSelect]);

  const maxFileSize = 20 * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: maxFileSize,
  });

  return selectedFile ? (
    /* ── File selected ── */
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
      style={{
        background: "rgba(16,185,129,0.08)",
        border: "1.5px solid rgba(16,185,129,0.3)",
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "rgba(16,185,129,0.12)" }}
      >
        <img src="/images/pdf.webp" alt="pdf" className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">
          {selectedFile.name}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#6ee7b7" }}>
          {formatSize(selectedFile.size)} &middot; Ready to analyze
        </p>
      </div>
      {/* Green check */}
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mr-1"
        style={{ background: "rgba(16,185,129,0.2)" }}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="#10b981" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <button
        type="button"
        className="shrink-0 p-1.5 rounded-lg transition-colors"
        style={{ background: "rgba(255,255,255,0.06)" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.15)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)")}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleRemoveFile();
        }}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  ) : (
    /* ── Drop zone ── */
    <div
      {...getRootProps()}
      className="w-full rounded-xl cursor-pointer transition-all duration-200"
      style={{
        background: isDragActive ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.03)",
        border: isDragActive
          ? "2px dashed #818cf8"
          : "2px dashed rgba(148,163,184,0.2)",
        boxShadow: isDragActive ? "0 0 0 4px rgba(129,140,248,0.1)" : "none",
      }}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-2.5 py-9 px-5">
        {/* Upload icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-1 transition-all duration-200"
          style={{
            background: isDragActive
              ? "rgba(129,140,248,0.15)"
              : "rgba(255,255,255,0.05)",
            border: isDragActive
              ? "1px solid rgba(129,140,248,0.3)"
              : "1px solid rgba(255,255,255,0.08)",
            transform: isDragActive ? "scale(1.08)" : "scale(1)",
          }}
        >
          <svg
            className="w-7 h-7 transition-all duration-200"
            fill="none"
            stroke={isDragActive ? "#818cf8" : "#64748b"}
            strokeWidth={1.6}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>

        <div className="text-center">
          <p className="text-sm font-medium" style={{ color: "#e2e8f0" }}>
            {isDragActive ? (
              <span style={{ color: "#818cf8", fontWeight: 600 }}>Drop your file here</span>
            ) : (
              <>
                <span style={{ color: "#818cf8", fontWeight: 600 }}>Click to upload</span>
                {" "}or drag &amp; drop
              </>
            )}
          </p>
          <p className="text-xs mt-1" style={{ color: "#64748b" }}>
            PDF only &mdash; max {formatSize(maxFileSize)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
