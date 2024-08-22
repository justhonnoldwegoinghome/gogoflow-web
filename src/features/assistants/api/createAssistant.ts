import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { post } from "@/apiClient";
import { Company } from "@/features/companies";

import { Assistant } from "../types";

interface CreateAssistantParams {
  data: {
    company_id: Company["id"];
    name: Assistant["name"];
    instructions: Assistant["instructions"];
  };
}

function createAssistant({ data }: CreateAssistantParams) {
  return post<Assistant>("/assistants", data);
}

export function useCreateAssistant({
  companyId,
}: {
  companyId: Company["id"];
}) {
  const push = useRouter().push;

  return useSWRMutation(
    `/companies/${companyId}/assistants`,
    (_, { arg }: { arg: CreateAssistantParams }) =>
      createAssistant(arg).then((res) => push(`/c/${companyId}/bots`)),
    {
      throwOnError: false,
    }
  );
}
