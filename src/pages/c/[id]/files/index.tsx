import { useRouter } from "next/router";

import { TypographyH1 } from "@/components/typography";
import { LoggedIn } from "@/features/authentication";
import { Company } from "@/features/companies";
import { CompanyFileList } from "@/features/files";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <div className="flex flex-col gap-1">
          <TypographyH1>Files</TypographyH1>
          <CompanyFileList id={id} />
        </div>
      )}
    </LoggedIn>
  );
}
