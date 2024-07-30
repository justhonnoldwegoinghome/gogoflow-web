import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { formatDate, formatTime } from "@/utils";
import { Avatar, AvatarImage } from "@/components/avatar";

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
import { MaxPageSize } from "@/apiClient";
import { Company } from "@/features/companies";

import { useCompanyConversationListInfinite } from "../api/getCompanyConversationList";
import { Conversation } from "../types";

export type Source = "shopee";
export type ConvoType = "all" | "unread" | "pinned";

interface CompanyConversationListContainerProps {
  id: Company["id"];
}

export function CompanyConversationListContainer({
  id,
}: CompanyConversationListContainerProps) {
  const [source, setSource] = useState<Source>("shopee");
  const [convoType, setConvoType] = useState<ConvoType>("all");
  const [maxPageSize, setPageSize] = useState<MaxPageSize>(10);

  return (
    <div className="max-w-screen-tablet mx-auto">
      <ConversionListController
        source={source}
        changeSource={(s) => setSource(s)}
        convoType={convoType}
        changeConvoType={(ct) => setConvoType(ct)}
        maxPageSize={maxPageSize}
        changePageSize={(ps) => setPageSize(ps)}
      />
      <br />
      <CompanyConversationList
        id={id}
        source={source}
        convoType={convoType}
        maxPageSize={maxPageSize}
      />
    </div>
  );
}

interface ConversionListControllerProps {
  source: Source;
  changeSource: (s: Source) => void;
  convoType: ConvoType;
  changeConvoType: (ct: ConvoType) => void;
  maxPageSize: MaxPageSize;
  changePageSize: (ps: MaxPageSize) => void;
}

const sourceMapping = [
  {
    value: "shopee",
    label: "Shopee",
  },
];

const convoTypeMapping = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "unread",
    label: "Unread",
  },
  {
    value: "pinned",
    label: "Pinned",
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

function ConversionListController({
  source,
  changeSource,
  convoType,
  changeConvoType,
  maxPageSize,
  changePageSize,
}: ConversionListControllerProps) {
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
      <Select value={convoType} onValueChange={changeConvoType}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {convoTypeMapping.map((c) => (
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

interface CompanyConversationListProps {
  id: Company["id"];
  source: "shopee";
  convoType: "all" | "unread" | "pinned";
  maxPageSize: number;
}

function CompanyConversationList({
  id,
  source,
  convoType,
  maxPageSize,
}: CompanyConversationListProps) {
  const { data, hasEnded, loadMore, isValidating } =
    useCompanyConversationListInfinite({
      id,
      source,
      maxPageSize,
      convoType,
    });

  if (!data) return <Spinner />;

  return (
    <div>
      <div className="flex flex-col gap-6">
        {data.results.map((c, i) => (
          <ConversationCardUI key={i} conversation={c} />
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

interface ConversationCardUIProps {
  conversation: Conversation;
}

export function ConversationCardUI({ conversation }: ConversationCardUIProps) {
  const { asPath } = useRouter();

  const { id, source, last_message_at, buyer_name, buyer_avatar, num_unread } =
    conversation;

  return (
    <Link
      href={`${asPath}/${id}/messages`}
      className="bg-white flex gap-2 justify-between items-center p-4 rounded-lg border"
    >
      <div className="flex gap-2 items-center">
        <Avatar>
          {buyer_avatar ? (
            <AvatarImage src={buyer_avatar} />
          ) : (
            <span className="bg-gradient-to-b from-white to-gray-300 block w-10 h-10" />
          )}
        </Avatar>
        <p>{buyer_name}</p>
      </div>
      <br />
      <div className="flex flex-col items-end gap-4">
        <p className="text-sm text-muted-foreground w-fit ml-auto">{`${formatDate(
          new Date(last_message_at)
        )} | ${formatTime(new Date(last_message_at))}`}</p>
        {num_unread > 0 ? (
          <span className="text-sm bg-primary text-primary-foreground w-fit px-2 py-1 rounded">
            {num_unread}
          </span>
        ) : (
          <span className="text-sm bg-secondary text-secondary-foreground w-fit px-2 py-1 rounded">
            {num_unread}
          </span>
        )}
      </div>
    </Link>
  );
}
