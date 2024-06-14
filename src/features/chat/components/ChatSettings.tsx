import { Company } from "@/features/companies";

import { useChatSettings } from "../api/getChatSettings";

interface ChatSettingsProps {
  companyId: Company["id"];
}

export function ChatSettings({ companyId }: ChatSettingsProps) {
  const chatSettingsQuery = useChatSettings({ companyId });

  if (!chatSettingsQuery.data) return <div></div>;

  return (
    <div>
      <p>{`Auto reply: ${chatSettingsQuery.data.is_auto_reply}`}</p>
    </div>
  );
}
