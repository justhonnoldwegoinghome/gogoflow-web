import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/select";
import { MaxPageSize } from "@/apiClient";

export type Source = "shopee";
export type ConvoType = "all" | "unread" | "pinned";

interface ConversationListControllerProps {
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

export function ConversationListController({
  source,
  changeSource,
  convoType,
  changeConvoType,
  maxPageSize,
  changePageSize,
}: ConversationListControllerProps) {
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
