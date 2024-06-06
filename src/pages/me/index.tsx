import { LoggedIn } from "@/features/authentication";
import { UserCompanies } from "@/features/companies";

export default function () {
  return <LoggedIn>{(userId) => <UserCompanies id={userId} />}</LoggedIn>;
}
