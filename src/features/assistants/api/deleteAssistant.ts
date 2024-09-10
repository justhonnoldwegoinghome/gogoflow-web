import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { del } from "@/apiClient";
import { Company } from "@/features/companies";

import { Assistant } from "../types";

function deleteAssistant({ id }: { id: Assistant["id"] }) {
  return del<Assistant["id"]>(`/assistants/${id}`);
}

export function useDeleteAssistant({
  id,
  companyId,
}: {
  id: Assistant["id"];
  companyId: Company["id"];
}) {
  const push = useRouter().push;

  return useSWRMutation(
    `/companies/${companyId}/assistants`,
    () =>
      deleteAssistant({ id }).then(() => push(`/c/${companyId}/assistants`)),
    {
      throwOnError: false,
    }
  );
}
