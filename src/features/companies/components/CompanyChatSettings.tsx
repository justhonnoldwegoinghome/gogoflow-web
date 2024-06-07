import { Company } from "@/features/companies";

import { useCompanyChatSettings } from "../api/getCompanyChatSettings";

interface CompanyChatSettingsProps {
  id: Company["id"];
}

export function CompanyChatSettings({ id }: CompanyChatSettingsProps) {
  const companyChatSettingsQuery = useCompanyChatSettings({ id });

  if (!companyChatSettingsQuery.data) return <div></div>;

  return (
    <div>
      <div>{`is_shopee_authorized: ${companyChatSettingsQuery.data.is_shopee_authorized}`}</div>
    </div>
  );
}
