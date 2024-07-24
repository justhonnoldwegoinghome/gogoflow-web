import { LoggedIn } from "@/features/authentication";
import { CreateCompany } from "@/features/companies";
import { UserLayout } from "@/layouts";

export default function Page() {
  return (
    <UserLayout>
      <LoggedIn>{() => <CreateCompany />}</LoggedIn>
    </UserLayout>
  );
}
