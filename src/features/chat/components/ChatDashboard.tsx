import { Company } from "@/features/companies";

import { ChatSettings } from "./ChatSettings";
import { Conversations } from "./Conversations";

interface ChatDashboardProps {
  id: Company["id"];
}

export function ChatDashboard({ id }: ChatDashboardProps) {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="font-semibold">Chat settings</h2>
        <ChatSettings companyId={id} />
      </div>

      <div>
        <h2 className="font-semibold">Conversations</h2>
        <p className="text-red-500">TODO: check shopee authorization first</p>
        <Conversations companyId={id} />
      </div>
    </div>
  );
}
