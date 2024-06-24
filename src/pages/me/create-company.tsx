import { LoggedIn } from "@/features/authentication";
import { CreateCompany } from "@/features/companies";

export default function Page() {
  return <LoggedIn>{() => <CreateCompany />}</LoggedIn>;
}
