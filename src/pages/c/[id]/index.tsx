import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowUpRight } from "lucide-react";

import { TypographyH2 } from "@/components/typography";
import { Button } from "@/components/button";
import { LoggedIn } from "@/features/authentication";
import { Company, DeleteCompany, UpdateCompany } from "@/features/companies";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <div>
          <div className="ml-auto w-fit flex flex-col items-start">
            <Button asChild variant="link">
              <Link href={`/c/${id}/files`}>
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Files
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link href={`/c/${id}/conversations`}>
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Conversations
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link href={`/c/${id}/products`}>
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Products
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-1">
              <TypographyH2>Company</TypographyH2>
              <UpdateCompany id={id} />
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
