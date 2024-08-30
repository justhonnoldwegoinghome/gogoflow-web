import { TypographyP } from "@/components/typography";
import { Assistant } from "@/features/assistants";

import { useAssistantFileList } from "../api/getAssistantFileList";
import { UploadFiles } from "./UploadFiles";
import { FileCard } from "./FileCard";
import { Spinner } from "@/components/spinner";
import { File } from "lucide-react";

interface AssistantFileListProps {
  id: Assistant["id"];
}

export function AssistantFileList({ id }: AssistantFileListProps) {
  const companyFileListQuery = useAssistantFileList({ id });

  if (!companyFileListQuery.data) return <Spinner />;

  if (companyFileListQuery.data.results.length === 0)
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="bg-secondary w-20 h-20 flex items-center justify-center rounded-full">
            <File size={30} strokeWidth={1} />
          </div>
          <div>
            <p className="font-medium text-center">No files found</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {companyFileListQuery.data.results.length === 0 ? (
        <TypographyP>No files added yet</TypographyP>
      ) : (
        companyFileListQuery.data.results.map((f) => (
          <FileCard key={f.id} id={f.id} assistantId={id} />
        ))
      )}
    </div>
  );
}
