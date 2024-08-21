import { useRouter } from "next/router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { LoggedIn } from "@/features/authentication";
import { CompanyLayout } from "@/layouts";
import { Company, DeleteCompany, UpdateCompany } from "@/features/companies";
import { CompanyAssistantList } from "@/features/assistants";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <CompanyLayout id={id} tab="settings">
      <LoggedIn>
        {(userId) => (
          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="assistants">Bot</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <div>
                <UpdateCompany id={id} />
                <br />
                <DeleteCompany id={id} userId={userId} />
              </div>
            </TabsContent>
            <TabsContent value="assistants">
              <CompanyAssistantList id={id} />
            </TabsContent>
          </Tabs>
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
