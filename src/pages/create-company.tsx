import { AuthenticatedLayout, PagePadding } from "@/layouts";
import { LoggedIn } from "@/features/authentication";
import { CreateCompanyForm } from "@/features/companies";

export default function Page() {
  return (
    <LoggedIn>
      {(userId) => (
        <AuthenticatedLayout
          userId={userId}
          selectedCompanyId={null}
          companyTab={null}
        >
          <PagePadding>
            <div className="w-full max-w-screen-tablet mx-auto">
              <CreateCompanyForm />
            </div>
          </PagePadding>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
