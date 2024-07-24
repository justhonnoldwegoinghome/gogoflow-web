import { LoggedIn } from "@/features/authentication";
import { UpdateUser } from "@/features/users";
import { UserLayout } from "@/layouts";

export default function Page() {
  return (
    <UserLayout>
      <LoggedIn>{(userId) => <UpdateUser id={userId} />}</LoggedIn>
    </UserLayout>
  );
}
