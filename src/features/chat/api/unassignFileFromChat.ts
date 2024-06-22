import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";
import { Company } from "@/features/companies";
import { File } from "@/features/files";

import { Chat } from "../types";

interface UnassignFileFromChatParams {
  companyId: Company["id"];
  data: {
    fileId: File["id"];
  };
}

export function unassignFileFromChat({
  companyId,
  data,
}: UnassignFileFromChatParams) {
  return post<Chat>(`/companies/${companyId}:unassign-file-from-chat`, {
    file_id: data["fileId"],
  });
}

export function useUnassignFileFromChat({
  companyId,
}: Pick<UnassignFileFromChatParams, "companyId">) {
  return useSWRMutation(
    `/companies/${companyId}/chat`,
    (_, { arg }: { arg: Pick<UnassignFileFromChatParams, "data"> }) =>
      unassignFileFromChat({
        companyId,
        data: arg["data"],
      }),
    {
      throwOnError: false,
    }
  );
}
