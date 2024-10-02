import { ChangePasswordForm, LoggedIn } from "@/features/authentication";
import { AuthenticatedLayout, PagePadding } from "@/layouts";

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
              <ChangePasswordForm />
            </div>
          </PagePadding>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
