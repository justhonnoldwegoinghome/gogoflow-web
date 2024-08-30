import { MaxPageSize } from "@/apiClient";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/select";

import { Product } from "../types";

export type Source = "shopee";
export type Status = Product["status"];

interface ProductListControllerProps {
  source: Source;
  changeSource: (s: Source) => void;
  status: Status;
  changeStatus: (s: Status) => void;
  maxPageSize: MaxPageSize;
  changePageSize: (ps: MaxPageSize) => void;
}

const sourceMapping = [
  {
    value: "shopee",
    label: "Shopee",
  },
];

const statusMapping = [
  {
    value: "normal",
    label: "Normal",
  },
  {
    value: "unlisted",
    label: "Unlisted",
  },
];

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

export function ProductListController({
  source,
  changeSource,
  status,
  changeStatus,
  maxPageSize,
  changePageSize,
}: ProductListControllerProps) {
  return (
    <div className="flex gap-4">
      <Select value={source} onValueChange={changeSource}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sourceMapping.map((c) => (
              <SelectItem key={c.label} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={status} onValueChange={changeStatus}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {statusMapping.map((c) => (
              <SelectItem key={c.label} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
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
