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
}: {
  id: File["id"];
  companyId: Company["id"];
}) {
  return useSWRMutation(
    `/companies/${companyId}/files`,
    () => deleteFile({ id }),
    {
      throwOnError: false,
    }
  );
}
