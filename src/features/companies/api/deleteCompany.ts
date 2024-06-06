import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { del } from "@/apiClient";
import { User } from "@/features/users";

import { Company } from "../types";

function deleteCompany({ id }: { id: Company["id"] }) {
  return del<Company["id"]>(`/companies/${id}`);
}

export function useDeleteCompany({
  id,
  userId,
}: {
  id: Company["id"];
  userId: User["id"];
}) {
  const push = useRouter().push;

  return useSWRMutation(
    `/users/${userId}/companies`,
    () => deleteCompany({ id }).then((res) => push("/me")),
    {
      throwOnError: false,
    }
  );
}
