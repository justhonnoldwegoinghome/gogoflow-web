import { useState } from "react";

import { Company } from "@/features/companies";

import { useChatSettings } from "../api/getChatSettings";
import { ChatFileCard } from "./ChatFileCard";
import { AssignFilesToChatForm } from "./AssignFilesToChatForm";

interface ChatSettingsProps {
  companyId: Company["id"];
}

export function ChatSettings({ companyId }: ChatSettingsProps) {
  const [showAssignFilesToChatForm, setShowAssignFileToChatForm] =
    useState(false);

  const chatSettingsQuery = useChatSettings({ companyId });

  if (!chatSettingsQuery.data) return <div></div>;

  const { company_id, is_auto_reply, file_id_list } = chatSettingsQuery.data;

  return (
    <div>
      <p>{`Company id: ${company_id}`}</p>
      <p>{`Is auto reply: ${is_auto_reply}`}</p>
      <p>{"Chat files: "}</p>
      <div className="ml-4 w-fit">
        {file_id_list.length === 0 ? (
          <p>No files assigned to chat yet.</p>
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
        className="bg-gray-300"
        onClick={() => setShowAssignFileToChatForm(!showAssignFilesToChatForm)}
      >
        Assign files to chat
      </button>

      {showAssignFilesToChatForm && (
        <AssignFilesToChatForm
          companyId={companyId}
          existingFileIdList={file_id_list}
        />
      )}
    </div>
  );
}
