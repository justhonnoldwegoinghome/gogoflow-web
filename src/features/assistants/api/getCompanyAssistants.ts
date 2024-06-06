import useSWR from "swr";

import { APIList, get } from "@/apiClient";
import { Company } from "@/features/companies";

import { Assistant } from "../types";

export function getCompanyAssistants({ id }: { id: Company["id"] }) {
  return get<APIList<Assistant>>(`/companies/${id}/assistants`);
}

export function useCompanyAssistants({ id }: { id: Company["id"] }) {
  return useSWR(`/companies/${id}/assistants`, () =>
    getCompanyAssistants({ id })
  );
}
