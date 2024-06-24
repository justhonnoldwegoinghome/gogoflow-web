import { LoggedIn } from "@/features/authentication";
import { UserCompanyList } from "@/features/companies";

export default function Page() {
  return <LoggedIn>{(userId) => <UserCompanyList id={userId} />}</LoggedIn>;
}
