import { LoggedIn } from "@/features/authentication";
import { CreateCompanyForm } from "@/features/companies";
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
          <CreateCompanyForm />
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
