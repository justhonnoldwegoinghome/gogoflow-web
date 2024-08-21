import _ from "lodash";
import { Bot } from "lucide-react";
import { useState } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/select";
import { Spinner } from "@/components/spinner";
import { MaxPageSize } from "@/apiClient";
import { Company } from "@/features/companies";

import { AssistantResponseUI } from "./AssistantResponseUI";
import { useCompanyAssistantResponseListInfinite } from "../api/getCompanyAssistantResponseList";

interface CompanyAssistantResponseListContainerProps {
  id: Company["id"];
}

export function CompanyAssistantResponseListContainer({
  id,
}: CompanyAssistantResponseListContainerProps) {
  const [maxPageSize, setPageSize] = useState<MaxPageSize>(10);

  return (
    <div className="max-w-screen-tablet mx-auto">
      {/* <AssistantResponseListController
        maxPageSize={maxPageSize}
        changePageSize={(ps) => setPageSize(ps)}
      />
      <br /> */}
      <CompanyAssistantResponseList id={id} maxPageSize={maxPageSize} />
    </div>
  );
}

interface AssistantResponseListControllerProps {
  maxPageSize: MaxPageSize;
  changePageSize: (ps: MaxPageSize) => void;
}

const pageSizeMapping = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 50,
    label: "50",
  },
];

function AssistantResponseListController({
  maxPageSize,
  changePageSize,
}: AssistantResponseListControllerProps) {
  return (
    <div className="py-4 flex gap-4">
      <Select
        value={String(maxPageSize)}
        onValueChange={(ps) => changePageSize(Number(ps))}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {pageSizeMapping.map((c) => (
              <SelectItem key={c.label} value={String(c.value)}>
                {c.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

interface CompanyAssistantResponseListProps {
  id: Company["id"];
  maxPageSize: number;
}

function CompanyAssistantResponseList({
  id,
  maxPageSize,
}: CompanyAssistantResponseListProps) {
  const { data } = useCompanyAssistantResponseListInfinite({
    id,
    maxPageSize,
  });

  if (!data) return <Spinner />;

  if (data.results.length === 0)
    return (
      <div className="mx-auto">
        <div className="flex items-center gap-4">
          <div className="bg-secondary w-20 h-20 flex items-center justify-center rounded-full">
            <Bot size={30} />
          </div>
          <p>No bot logs yet.</p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      {_.orderBy(data.results, "created_at", "desc").map((br) => (
        <AssistantResponseUI key={br.id} botResponse={br} />
      ))}
    </div>
  );
}
