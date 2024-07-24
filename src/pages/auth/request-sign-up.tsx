import { RequestSignUp } from "@/features/authentication";
import { UnauthenticatedLayout } from "@/layouts";

export default function Page() {
  return (
    <UnauthenticatedLayout>
      <RequestSignUp />
    </UnauthenticatedLayout>
  );
}
