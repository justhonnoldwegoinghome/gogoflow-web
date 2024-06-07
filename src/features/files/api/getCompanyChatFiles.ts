import useSWR from "swr";

import { APIList, get } from "@/apiClient";
import { Company } from "@/features/companies";

import { File } from "../types";

export function getCompanyChatFiles({ id }: { id: Company["id"] }) {
  return get<APIList<File>>("/files", {
    params: {
      company_id: id,
      purpose: "chat",
    },
  });
}

export function useCompanyChatFiles({ id }: { id: Company["id"] }) {
  return useSWR(`/companies/${id}/chat-files`, () =>
    getCompanyChatFiles({ id })
  );
}
