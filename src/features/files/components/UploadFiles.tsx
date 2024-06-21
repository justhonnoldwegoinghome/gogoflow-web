import { useCallback, useRef, useState } from "react";

import { Company } from "@/features/companies";

import { useUploadFiles } from "../api/uploadFiles";

interface UploadFilesProps {
  companyId: Company["id"];
}

export function UploadFiles({ companyId }: UploadFilesProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);

  const uploadFilesMutation = useUploadFiles({
    companyId,
  });

  const handleSubmit = useCallback(() => {
    uploadFilesMutation
      .trigger({
        files,
        data: {
          company_id: companyId,
        },
      })
      .then(() => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setFiles([]);
      });
  }, [files, fileInputRef]);

  return (
    <div className="border w-fit">
      <label htmlFor="42" className="cursor-pointer">
        <p>Upload files</p>
      </label>
      <input
        type="file"
        id="42"
        multiple
        hidden
        accept=".txt,.doc,.docx,.pdf"
        onChange={(e) =>
          setFiles([...files, ...Array.from(e.target.files || [])])
        }
        ref={fileInputRef}
      />
      <div>
        {files.map((f, i) => (
          <div key={i}>
            <a href={URL.createObjectURL(f)} download={f.name}>
              {f.name}
            </a>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className={
          files.length > 0 ? "bg-blue-200" : "bg-red-200 cursor-not-allowed"
        }
      >
        Submit
      </button>
    </div>
  );
}
