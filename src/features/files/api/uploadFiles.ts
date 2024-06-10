import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";
import { Company } from "@/features/companies";

import { File as IFile } from "../types";

interface UploadFilesParams {
  files: File[];
  data: {
    company_id: Company["id"];
    purpose: IFile["purpose"];
  };
}

function uploadFiles({ files, data }: UploadFilesParams) {
  const formData = new FormData();

  files && Array.from(files).map((f) => formData.append(f.name, f));

  formData.append("json_data", JSON.stringify(data));

  return post<string>("/files", formData);
}

export function useUploadFiles({
  companyId,
  purpose,
}: {
  companyId: Company["id"];
  purpose: IFile["purpose"];
}) {
  const key = purpose === "chat" ? `/companies/${companyId}/chat-files` : "/";

  return useSWRMutation(
    key,
    (_, { arg }: { arg: UploadFilesParams }) => uploadFiles(arg),
    {
      throwOnError: false,
    }
  );
}
