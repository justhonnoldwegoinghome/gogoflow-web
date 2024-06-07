import { useRouter } from "next/router";

import { Company, CompanyChatSettings } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { CompanyChatFiles } from "@/features/files";

export default function CompanyChatPage() {
  const query = useRouter().query;
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <div>
          <h1 className="font-bold">Chat settings</h1>
          <CompanyChatSettings id={id} />
          <h2 className="font-bold">Files</h2>
          <CompanyChatFiles id={id} />
        </div>
      )}
    </LoggedIn>
  );
}
