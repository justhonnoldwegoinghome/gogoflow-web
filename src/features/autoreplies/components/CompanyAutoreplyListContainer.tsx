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

import { AutoreplyUI } from "./AutoreplyUI";
import { useCompanyAutoreplyListInfinite } from "../api/getCompanyAutoreplyList";

interface CompanyAutoreplyListContainerProps {
  id: Company["id"];
}

export function CompanyAutoreplyListContainer({
  id,
}: CompanyAutoreplyListContainerProps) {
  const [maxPageSize, setPageSize] = useState<MaxPageSize>(10);

  return (
    <div className="max-w-screen-tablet mx-auto">
      {/* <AutoreplyListController
        maxPageSize={maxPageSize}
        changePageSize={(ps) => setPageSize(ps)}
      />
      <br /> */}
      <CompanyAutoreplyList id={id} maxPageSize={maxPageSize} />
    </div>
  );
}

interface AutoreplyListControllerProps {
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

function AutoreplyListController({
  maxPageSize,
  changePageSize,
}: AutoreplyListControllerProps) {
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

interface CompanyAutoreplyListProps {
  id: Company["id"];
  maxPageSize: number;
}

function CompanyAutoreplyList({ id, maxPageSize }: CompanyAutoreplyListProps) {
  const { data } = useCompanyAutoreplyListInfinite({
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
        <AutoreplyUI key={br.id} botResponse={br} />
      ))}
    </div>
  );
}
