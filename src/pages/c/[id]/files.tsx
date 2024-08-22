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
    <CompanyLayout id={id} tab="files">
      <LoggedIn>
        {(userId) => (
          <div>
            <div className="p-4 border-b">
              <p className="text-2xl font-semibold">Files</p>
            </div>
            <div className="p-4">
              <CompanyFileList id={id} />
            </div>
          </div>
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
