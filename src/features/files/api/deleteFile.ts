import useSWRMutation from "swr/mutation";

import { del } from "@/apiClient";
import { Assistant } from "@/features/assistants";

import { File } from "../types";

function deleteFile({ id }: { id: File["id"] }) {
  return del<File["id"]>(`/files/${id}`);
}

export function useDeleteFile({
  id,
  assistantId,
}: {
  id: File["id"];
  assistantId: Assistant["id"];
}) {
  return useSWRMutation(
    `/assistants/${assistantId}/files`,
    () => deleteFile({ id }),
    {
      throwOnError: false,
    }
  );
}
