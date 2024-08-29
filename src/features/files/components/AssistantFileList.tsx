import { TypographyP } from "@/components/typography";
import { Assistant } from "@/features/assistants";

import { useAssistantFileList } from "../api/getAssistantFileList";
import { UploadFiles } from "./UploadFiles";
import { FileCard } from "./FileCard";

interface AssistantFileListProps {
  id: Assistant["id"];
}

export function AssistantFileList({ id }: AssistantFileListProps) {
  const companyFileListQuery = useAssistantFileList({ id });

  if (!companyFileListQuery.data) return <div></div>;

  return (
    <div>
      <div className="flex flex-col gap-4">
        {companyFileListQuery.data.results.length === 0 ? (
          <TypographyP>No files added yet</TypographyP>
        ) : (
          companyFileListQuery.data.results.map((f) => (
            <FileCard key={f.id} id={f.id} assistantId={id} />
          ))
        )}
      </div>
      <br />
      <div className="w-fit">
        <UploadFiles assistantId={id} />
      </div>
    </div>
  );
}
