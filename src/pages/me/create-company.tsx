import { LoggedIn } from "@/features/authentication";
import { CreateCompanyForm } from "@/features/companies";

export default function CreateCompany() {
  return (
    <LoggedIn>
      {() => (
        <div>
          <CreateCompanyForm />
        </div>
      )}
    </LoggedIn>
  );
}
