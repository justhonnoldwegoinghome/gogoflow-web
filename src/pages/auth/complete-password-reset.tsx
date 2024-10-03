import { useRouter } from "next/router";

import { UnauthenticatedLayout } from "@/layouts";
import { CompletePasswordResetForm } from "@/features/authentication";

export default function Page() {
  const query = useRouter().query;
  let { token } = query;

  if (!token) return <div />;

  token = token as string;

  return (
    <UnauthenticatedLayout>
      <CompletePasswordResetForm token={token} />
    </UnauthenticatedLayout>
  );
}
