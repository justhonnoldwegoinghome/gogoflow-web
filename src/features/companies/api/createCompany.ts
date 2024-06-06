import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { post } from "@/apiClient";

import { Company } from "../types";

interface CreateCompanyParams {
  data: {
    name: string;
  };
}

function createCompany({ data }: CreateCompanyParams) {
  return post<Company["id"]>("/companies", data);
}

export function useCreateCompany() {
  const push = useRouter().push;

  return useSWRMutation(
    "/companies",
    (_, { arg }: { arg: CreateCompanyParams }) =>
      createCompany(arg).then(() => push("/me")),
    {
      throwOnError: false,
    }
  );
}
