import { useState, useCallback, useRef } from "react";

import { Button } from "@/components/button";
import { Input } from "@/components/form";
import { Assistant } from "@/features/assistants";

import { useUploadFiles } from "../api/uploadFiles";

interface UploadFilesProps {
  assistantId: Assistant["id"];
}

export function UploadFiles({ assistantId }: UploadFilesProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);

  const uploadFilesMutation = useUploadFiles({
    assistantId,
  });

  const handleSubmit = useCallback(() => {
    uploadFilesMutation
      .trigger({
        files,
        data: {
          assistant_id: assistantId,
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
    <div className="flex flex-col gap-2">
      <div>
        {files.map((f, i) => (
          <div key={i}>
            <a
              href={URL.createObjectURL(f)}
              download={f.name}
              className="text-gray-700"
            >
              {f.name}
            </a>
          </div>
        ))}
      </div>

      <Input
        type="file"
        multiple
        accept=".txt,.doc,.docx,.pdf"
        onChange={(e) =>
          setFiles([...files, ...Array.from(e.target.files || [])])
        }
        id="file-uploader"
        ref={fileInputRef}
      />

      {files.length > 0 && (
        <Button
          onClick={handleSubmit}
          isLoading={uploadFilesMutation.isMutating}
        >
          Submit
        </Button>
      )}
    </div>
  );
}
