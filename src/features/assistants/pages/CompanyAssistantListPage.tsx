import { Plus, Bot } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/button";
import { Spinner } from "@/components/spinner";
import { PageWrapper } from "@/layouts";
import { Company } from "@/features/companies";

import { useCompanyAssistantList } from "../api/getCompanyAssistantList";
import { AssistantCardUI } from "../components/AssistantCardUI";

interface CompanyAssistantListPageProps {
  id: Company["id"];
}

export function CompanyAssistantListPage({
  id,
}: CompanyAssistantListPageProps) {
  const companyAssistantListQuery = useCompanyAssistantList({ id });

  if (!companyAssistantListQuery.data) return <Spinner />;

  if (companyAssistantListQuery.data.results.length === 0)
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="bg-secondary w-20 h-20 flex items-center justify-center rounded-full">
              <Bot size={30} strokeWidth={1} />
            </div>
            <div>
              <p className="font-medium text-center">No bots found</p>
              <p className="text-sm text-muted-foreground text-center">
                Create your first bot below
              </p>
            </div>
          </div>
          <Button asChild size="sm">
            <Link href={`/c/${id}/create-bot`}>
              <Plus className="mr-2" size={16} />
              <p>Create bot</p>
            </Link>
          </Button>
        </div>
      </div>
    );

  return (
    <PageWrapper>
      {companyAssistantListQuery.data.results.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="bg-secondary w-20 h-20 flex items-center justify-center rounded-full">
                <Bot size={30} strokeWidth={1} />
              </div>
              <div>
                <p className="font-medium text-center">No bots found</p>
                <p className="text-sm text-muted-foreground text-center">
                  Create your first bot below
                </p>
              </div>
            </div>
            <Button asChild size="sm">
              <Link href={`/c/${id}/create-bot`}>
                <Plus className="mr-2" size={16} />
                <p>Create bot</p>
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="w-fit ml-auto">
            <Button asChild size="sm">
              <Link href={`/c/${id}/create-bot`}>
                <Plus className="mr-2" size={16} />
                <p>Create</p>
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            {companyAssistantListQuery.data.results.map((a) => (
              <AssistantCardUI key={a.id} assistant={a} />
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
