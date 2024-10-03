import { RequestPasswordResetForm } from "@/features/authentication";
import { UnauthenticatedLayout } from "@/layouts";

export default function Page() {
  return (
    <UnauthenticatedLayout>
      <RequestPasswordResetForm />
    </UnauthenticatedLayout>
  );
}
