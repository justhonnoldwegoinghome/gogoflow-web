import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";
import { Company } from "@/features/companies";
import { File } from "@/features/files";

import { Chat } from "../types";

interface AssignFilesParams {
  companyId: Company["id"];
  data: {
    fileIdList: File["id"][];
  };
}

export function assignFiles({ companyId, data }: AssignFilesParams) {
  return post<Chat>(`/companies/${companyId}/chat:assign-files`, {
    file_id_list: data["fileIdList"],
  });
}

export function useAssignFiles({
  companyId,
}: Pick<AssignFilesParams, "companyId">) {
  return useSWRMutation(
    `/companies/${companyId}/chat`,
    (_, { arg }: { arg: Pick<AssignFilesParams, "data"> }) =>
      assignFiles({
        companyId,
        data: arg["data"],
      }),
    {
      throwOnError: false,
    }
  );
}
