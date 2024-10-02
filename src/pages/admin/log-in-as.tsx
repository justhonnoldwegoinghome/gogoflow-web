import { AuthenticatedLayout, PagePadding } from "@/layouts";
import { LoggedIn } from "@/features/authentication";
import { LogInAsForm } from "@/features/admin";

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
              <LogInAsForm />
            </div>
          </PagePadding>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
