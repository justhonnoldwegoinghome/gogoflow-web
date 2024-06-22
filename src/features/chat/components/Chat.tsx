import { useState } from "react";

import { Company } from "@/features/companies";

import { useChat } from "../api/getChat";
import { ChatFileCard } from "./ChatFileCard";
import { AssignFilesForm } from "./AssignFilesForm";

interface ChatProps {
  companyId: Company["id"];
}

export function Chat({ companyId }: ChatProps) {
  const [showAssignFilesForm, setShowAssignFileToChatForm] = useState(false);

  const chatSettingsQuery = useChat({ companyId });

  if (!chatSettingsQuery.data) return <div></div>;

  const { company_id, is_auto_reply, file_id_list } = chatSettingsQuery.data;

  return (
    <div>
      <p>{`Company id: ${company_id}`}</p>
      <p>{`Is auto reply: ${is_auto_reply}`}</p>
      <p>{"Chat files: "}</p>
      <div className="ml-4 w-fit">
        {file_id_list.length === 0 ? (
          <p className="text-gray-500">No files assigned to chat yet.</p>
        ) : (
          <div>
            {file_id_list.map((fid) => (
              <ChatFileCard key={fid} id={fid} companyId={companyId} />
            ))}
          </div>
        )}
      </div>

      <br />
      <button
        className="p-3 bg-blue-300"
        onClick={() => setShowAssignFileToChatForm(!showAssignFilesForm)}
      >
        Assign files to chat
      </button>

      <div className="mt-8 w-fit">
        {showAssignFilesForm && (
          <AssignFilesForm
            companyId={companyId}
            existingFileIdList={file_id_list}
          />
        )}
      </div>
    </div>
  );
}
