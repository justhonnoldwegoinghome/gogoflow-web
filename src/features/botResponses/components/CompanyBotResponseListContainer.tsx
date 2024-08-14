import _ from "lodash";
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

import { BotResponseUI } from "./BotResponseUI";
import { useCompanyBotResponseListInfinite } from "../api/getCompanyBotResponseList";

interface CompanyBotResponseListContainerProps {
  id: Company["id"];
}

export function CompanyBotResponseListContainer({
  id,
}: CompanyBotResponseListContainerProps) {
  const [maxPageSize, setPageSize] = useState<MaxPageSize>(10);

  return (
    <div className="max-w-screen-tablet mx-auto">
      {/* <BotResponseListController
        maxPageSize={maxPageSize}
        changePageSize={(ps) => setPageSize(ps)}
      />
      <br /> */}
      <CompanyBotResponseList id={id} maxPageSize={maxPageSize} />
    </div>
  );
}

interface BotResponseListControllerProps {
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

function BotResponseListController({
  maxPageSize,
  changePageSize,
}: BotResponseListControllerProps) {
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

interface CompanyBotResponseListProps {
  id: Company["id"];
  maxPageSize: number;
}

function CompanyBotResponseList({
  id,
  maxPageSize,
}: CompanyBotResponseListProps) {
  const { data } = useCompanyBotResponseListInfinite({
    id,
    maxPageSize,
  });

  if (!data) return <Spinner />;

  return (
    <div className="flex flex-col gap-6">
      {_.orderBy(data.results, "created_at", "desc").map((br) => (
        <BotResponseUI key={br.id} botResponse={br} />
      ))}
    </div>
  );
}
