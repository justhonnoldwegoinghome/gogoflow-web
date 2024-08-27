import { LoggedIn } from "@/features/authentication";
import { CreateCompanyPage } from "@/features/companies";
import { AuthenticatedLayout } from "@/layouts";

export default function Page() {
  return (
    <LoggedIn>
      {(userId) => (
        <AuthenticatedLayout
          userId={userId}
          selectedCompanyId={null}
          companyTab={null}
        >
          <CreateCompanyPage />
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
