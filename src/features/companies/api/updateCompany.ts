import useSWRMutation from "swr/mutation";

import { put } from "@/apiClient";

import { Company } from "../types";

interface UpdateCompanyParams {
  id: Company["id"];
  data: {
    name?: Company["name"];
    chat_asst_instructions?: Company["chat_asst_instructions"];
  };
}

function updateCompany({ id, data }: UpdateCompanyParams) {
  return put<Company>(`/companies/${id}`, data);
}

export function useUpdateCompany({ id }: Pick<UpdateCompanyParams, "id">) {
  return useSWRMutation(
    `/companies/${id}`,
    (_, { arg }: { arg: UpdateCompanyParams }) => updateCompany(arg),
    {
      throwOnError: false,
    }
  );
}
