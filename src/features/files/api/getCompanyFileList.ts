import useSWR from "swr";

import { APIList, get } from "@/apiClient";
import { Company } from "@/features/companies";

import { File } from "../types";

export function getCompanyFileList({ id }: { id: Company["id"] }) {
  return get<APIList<File>>("/files", {
    params: {
      company_id: id,
    },
  });
}

export function useCompanyFileList({ id }: { id: Company["id"] }) {
  return useSWR(`/companies/${id}/files`, () => getCompanyFileList({ id }));
}
