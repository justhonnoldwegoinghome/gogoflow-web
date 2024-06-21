import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { ChatDashboard } from "@/features/chat";

export default function CompanyChatPage() {
  const query = useRouter().query;
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return <LoggedIn>{(userId) => <ChatDashboard id={id} />}</LoggedIn>;
}
