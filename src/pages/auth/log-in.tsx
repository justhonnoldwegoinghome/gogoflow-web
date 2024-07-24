import { LogIn } from "@/features/authentication";
import { UnauthenticatedLayout } from "@/layouts";

export default function Page() {
  return (
    <UnauthenticatedLayout>
      <LogIn />
    </UnauthenticatedLayout>
  );
}
