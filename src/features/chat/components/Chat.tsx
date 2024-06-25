import { useState } from "react";

import { Company } from "@/features/companies";

import { useChat } from "../api/getChat";
import { ChatFileCard } from "./ChatFileCard";
import { AssignFiles } from "./AssignFiles";
import { Button } from "@/components/button";

interface ChatProps {
  companyId: Company["id"];
}

export function Chat({ companyId }: ChatProps) {
  const [showAssignFiles, setShowAssignFileToChatForm] = useState(false);

  const chatQuery = useChat({ companyId });
  if (!chatQuery.data) return <div></div>;
  const { company_id, is_auto_reply, file_id_list } = chatQuery.data;

  return (
    <div>
      <p>{`Company id: ${company_id}`}</p>
      <p>{`Is auto reply: ${is_auto_reply}`}</p>
      <p>{"Chat files: "}</p>
      <div className="ml-4 w-fit">
        {file_id_list.length === 0 ? (
          <p className="text-gray-500">No files assigned to chat yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {file_id_list.map((fid) => (
              <ChatFileCard key={fid} id={fid} companyId={companyId} />
            ))}
          </div>
        )}
      </div>

      <br />
      <Button
        type="button"
        onClick={() => setShowAssignFileToChatForm(!showAssignFiles)}
      >
        Assign files to chat
      </Button>

      <div className="mt-8 w-fit">
        {showAssignFiles && (
          <AssignFiles
            companyId={companyId}
            existingFileIdList={file_id_list}
          />
        )}
      </div>
    </div>
  );
}
