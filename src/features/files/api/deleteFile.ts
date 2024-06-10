import useSWRMutation from "swr/mutation";

import { del } from "@/apiClient";
import { Company } from "@/features/companies";

import { File } from "../types";

function deleteFile({ id }: { id: File["id"] }) {
  return del<File["id"]>(`/files/${id}`);
}

export function useDeleteFile({
  id,
  companyId,
  purpose,
}: {
  id: File["id"];
  companyId: Company["id"];
  purpose: File["purpose"];
}) {
  return useSWRMutation(
    purpose === "chat" ? `/companies/${companyId}/chat-files` : "/",
    () => deleteFile({ id }),
    {
      throwOnError: false,
    }
  );
}
