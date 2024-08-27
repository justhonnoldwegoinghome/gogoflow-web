import { LoggedIn } from "@/features/authentication";
import { UpdateUser } from "@/features/users";
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
          <div className="px-8 pt-8 pb-24 flex justify-center">
            <div className="w-full max-w-screen-tablet">
              <UpdateUser id={userId} />
            </div>
          </div>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
