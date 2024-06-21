import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";
import { Company } from "@/features/companies";

interface UploadFilesParams {
  files: File[];
  data: {
    company_id: Company["id"];
  };
}

function uploadFiles({ files, data }: UploadFilesParams) {
  const formData = new FormData();

  files && Array.from(files).map((f) => formData.append(f.name, f));

  formData.append("json_data", JSON.stringify(data));

  return post<string>("/files", formData);
}

export function useUploadFiles({ companyId }: { companyId: Company["id"] }) {
  return useSWRMutation(
    `/companies/${companyId}/files`,
    (_, { arg }: { arg: UploadFilesParams }) => uploadFiles(arg),
    {
      throwOnError: false,
    }
  );
}
