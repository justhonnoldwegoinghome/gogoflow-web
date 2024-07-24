import { useState } from "react";

import { MaxPageSize } from "@/apiClient";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/select";
import { Button } from "@/components/button";
import { Spinner } from "@/components/spinner";
import { Company } from "@/features/companies";

import { useCompanyProductListInfinite } from "../api/getCompanyProductList";

export type Source = "shopee";
export type Status =
  | "NORMAL"
  | "BANNED"
  | "UNLIST"
  | "REVIEWING"
  | "SELLER_DELETE"
  | "SHOPEE_DELETE";

interface CompanyProductListContainerProps {
  id: Company["id"];
}

export function CompanyProductListContainer({
  id,
}: CompanyProductListContainerProps) {
  const [source, setSource] = useState<Source>("shopee");
  const [status, setStatus] = useState<Status>("NORMAL");
  const [maxPageSize, setPageSize] = useState<MaxPageSize>(10);

  return (
    <div className="max-w-screen-tablet mx-auto">
      <ProductListController
        source={source}
        changeSource={(s) => setSource(s)}
        status={status}
        changeStatus={(s) => setStatus(s)}
        maxPageSize={maxPageSize}
        changePageSize={(ps) => setPageSize(ps)}
      />
      <br />
      <CompanyProductList
        id={id}
        source={source}
        status={status}
        maxPageSize={maxPageSize}
      />
    </div>
  );
}

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
    value: "NORMAL",
    label: "Normal",
  },
  {
    value: "UNLIST",
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

function ProductListController({
  source,
  changeSource,
  status,
  changeStatus,
  maxPageSize,
  changePageSize,
}: ProductListControllerProps) {
  return (
    <div className="py-4 flex gap-4">
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

interface CompanyProductListProps {
  id: Company["id"];
  source: "shopee";
  status: Status;
  maxPageSize: number;
}

function CompanyProductList({
  id,
  source,
  status,
  maxPageSize,
}: CompanyProductListProps) {
  const { data, hasEnded, loadMore, isValidating } =
    useCompanyProductListInfinite({
      id,
      source,
      maxPageSize,
      status,
    });

  if (!data) return <Spinner />;

  return (
    <div>
      <div className="flex flex-col gap-16">
        {data.results.map((p) => (
          <div key={p.id}>
            <p className="font-bold mb-2">{p.name}</p>
            <p className="text-gray-600 text-sm whitespace-pre-wrap">
              {p.description}
            </p>
          </div>
        ))}
      </div>
      <br />
      {hasEnded ? (
        <Button disabled variant="outline">
          End of list
        </Button>
      ) : (
        <Button onClick={loadMore} isLoading={isValidating}>
          Load more
        </Button>
      )}
    </div>
  );
}
