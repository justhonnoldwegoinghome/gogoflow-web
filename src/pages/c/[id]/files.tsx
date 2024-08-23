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
            <div className="px-6 py-3 border-b sticky top-0 bg-white z-10">
              <p className="text-xl  font-semibold">Files</p>
            </div>
            <div className="p-6">
              <CompanyFileList id={id} />
            </div>
          </div>
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
