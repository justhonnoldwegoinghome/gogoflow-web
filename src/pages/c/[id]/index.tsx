import Link from "next/link";
import { useRouter } from "next/router";

import { TypographyH2 } from "@/components/typography";
import { Button } from "@/components/button";
import { LoggedIn } from "@/features/authentication";
import { Company, DeleteCompany, UpdateCompany } from "@/features/companies";
import { CompanyFileList } from "@/features/files";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <div>
          <div className="ml-auto w-fit">
            <Button asChild variant="link">
              <Link href={`/c/${id}/chat`}>Go to chat</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-1">
              <TypographyH2>Company</TypographyH2>
              <UpdateCompany id={id} />
            </div>
            <div className="flex flex-col gap-1">
              <TypographyH2>Files</TypographyH2>
              <CompanyFileList id={id} />
            </div>
            <div className="flex flex-col gap-1">
              <TypographyH2>Delete account</TypographyH2>
              <DeleteCompany id={id} userId={userId} />
            </div>
          </div>
        </div>
      )}
    </LoggedIn>
  );
}
