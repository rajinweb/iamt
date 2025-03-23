import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useController, Control } from "react-hook-form";

interface FileDropzoneProps {
  name: string;
  control: Control;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ name, control }) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      //onChange(acceptedFiles); // Update react-hook-form state
      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]); // Store only the first file
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "text/csv": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/vnd.ms-excel": [],
    },
    multiple: false,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-1 border-dashed p-6 rounded-md text-center cursor-pointer transition-all 
          ${isDragActive ? "border-blue-500 bg-blue-100" : "border-blue-300 bg-blue-100/50"}
        `}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-700">Drop the file here...</p>
        ) : (
          <p>Drag & drop a CSV or Excel file here, or click to select one</p>
        )}
      </div>

      {/* Show selected file name */}      
      {value && <small className="text-green-700 font-semibold">Selected: {value.name}</small>}

      {/* Show error if validation fails */}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FileDropzone;
