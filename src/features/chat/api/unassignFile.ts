import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";
import { Company } from "@/features/companies";
import { File } from "@/features/files";

import { Chat } from "../types";

interface UnassignFileParams {
  companyId: Company["id"];
  data: {
    fileId: File["id"];
  };
}

export function unassignFile({ companyId, data }: UnassignFileParams) {
  return post<Chat>(`/companies/${companyId}/chat:unassign-file`, {
    file_id: data["fileId"],
  });
}

export function useUnassignFile({
  companyId,
}: Pick<UnassignFileParams, "companyId">) {
  return useSWRMutation(
    `/companies/${companyId}/chat`,
    (_, { arg }: { arg: Pick<UnassignFileParams, "data"> }) =>
      unassignFile({
        companyId,
        data: arg["data"],
      }),
    {
      throwOnError: false,
    }
  );
}
