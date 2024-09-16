import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";

import { Company } from "../types";

interface CreateCompanyParams {
  data: {
    name: string;
  };
}

function createCompany({ data }: CreateCompanyParams) {
  return post<Company>("/companies", data);
}

export function useCreateCompany() {
  return useSWRMutation(
    "/companies",
    (_, { arg }: { arg: CreateCompanyParams }) => createCompany(arg),
    {
      throwOnError: false,
    }
  );
}
