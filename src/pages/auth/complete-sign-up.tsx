import { useRouter } from "next/router";

import { CompleteSignUp } from "@/features/authentication";
import { UnauthenticatedLayout } from "@/layouts";

export default function Page() {
  const query = useRouter().query;
  let { token } = query;

  if (!token) return <div />;

  token = token as string;

  return (
    <UnauthenticatedLayout>
      <CompleteSignUp token={token} />
    </UnauthenticatedLayout>
  );
}
