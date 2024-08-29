import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";
import { Assistant } from "@/features/assistants";

interface UploadFilesParams {
  files: File[];
  data: {
    assistant_id: Assistant["id"];
  };
}

function uploadFiles({ files, data }: UploadFilesParams) {
  const formData = new FormData();

  files && Array.from(files).map((f) => formData.append(f.name, f));

  formData.append("json_data", JSON.stringify(data));

  return post<string>("/files", formData);
}

export function useUploadFiles({
  assistantId,
}: {
  assistantId: Assistant["id"];
}) {
  return useSWRMutation(
    `/assistants/${assistantId}/files`,
    (_, { arg }: { arg: UploadFilesParams }) => uploadFiles(arg),
    {
      throwOnError: false,
    }
  );
}
