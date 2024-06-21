import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";
import { Company } from "@/features/companies";
import { File as IFile } from "@/features/files";

import { Chat } from "../types";

interface AssignFilesToChatParams {
  companyId: Company["id"];
  data: {
    fileIdList: IFile["id"][];
  };
}

export function assignFilesToChat({
  companyId,
  data,
}: AssignFilesToChatParams) {
  return post<Chat>(`/companies/${companyId}:assign-files-to-chat`, {
    file_id_list: data["fileIdList"],
  });
}

export function useAssignFilesToChat({
  companyId,
}: Pick<AssignFilesToChatParams, "companyId">) {
  return useSWRMutation(
    `/companies/${companyId}/chat`,
    (_, { arg }: { arg: Pick<AssignFilesToChatParams, "data"> }) =>
      assignFilesToChat({
        companyId,
        data: arg["data"],
      }),
    {
      throwOnError: false,
    }
  );
}
