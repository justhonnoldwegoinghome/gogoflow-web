import { useRouter } from "next/router";

import { LoggedIn } from "@/features/authentication";
import { Company } from "@/features/companies";
import { CompanyFileList } from "@/features/files";
import { CompanyLayout } from "@/layouts";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <CompanyLayout id={id} tab="files" header={{ title: "Files" }}>
          <div className="p-6">
            <CompanyFileList id={id} />
          </div>
        </CompanyLayout>
      )}
    </LoggedIn>
  );
}
