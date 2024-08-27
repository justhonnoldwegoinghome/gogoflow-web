// import clsx from "clsx";
// import Link from "next/link";
// import { Bot, Plus } from "lucide-react";

// import { Button } from "@/components/button";
// import { formatDate } from "@/utils";
// import { Spinner } from "@/components/spinner";
// import { Company } from "@/features/companies";

// import { useCompanyAssistantList } from "../api/getCompanyAssistantList";
// import { Assistant } from "../types";

// interface CompanyAssistantListProps {
//   id: Company["id"];
//   selectedAssistantId: Assistant["id"] | null;
// }

// export function CompanyAssistantList({
//   id,
//   selectedAssistantId,
// }: CompanyAssistantListProps) {
//   const companyAssistantListQuery = useCompanyAssistantList({ id });

//   if (!companyAssistantListQuery.data) return <Spinner />;

//   if (companyAssistantListQuery.data.results.length === 0)
//     return (
//       <div className="flex flex-col gap-4 items-center h-full justify-center">
//         <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
//           <Bot size={24} />
//         </div>
//         <div>
//           <p className="text-center font-semibold">No bots found</p>
//           <p className="text-center text-muted-foreground">
//             Create a bot to get started.
//           </p>
//         </div>
//         <div>
//           <Button asChild>
//             <Link
//               href={`/c/${id}/create-bot`}
//               className="flex gap-2 items-center"
//             >
//               <Plus size={16} />
//               <p>Create</p>
//             </Link>
//           </Button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="w-full flex flex-col">
//       {companyAssistantListQuery.data.results.map((a) => (
//         <Link key={a.id} href={`/c/${id}/bots/${a.id}`}>
//           <div
//             className={clsx(
//               "p-3 rounded-lg flex gap-4 justify-between items-center hover:bg-secondary",
//               {
//                 "bg-secondary": a.id === selectedAssistantId,
//               }
//             )}
//           >
//             <div>
//               <p className="text-sm font-semibold">{a.name}</p>
//               <p className="text-xs text-muted-foreground">{a.id}</p>
//             </div>
//             <div>
//               <p className="text-xs text-muted-foreground">
//                 {formatDate(new Date(a.created_at))}
//               </p>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }

import { Plus, ChevronsUpDown, Bot } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/dropdownMenu";
import { Button } from "@/components/button";

import { Assistant } from "../types";
import { useCompanyAssistantList } from "../api/getCompanyAssistantList";
import { Company } from "@/features/companies";

interface CompanyAssistantListProps {
  id: Company["id"];
  selectedAssistantId: Assistant["id"] | null;
}

export function CompanyAssistantList({
  id,
  selectedAssistantId,
}: CompanyAssistantListProps) {
  const { push } = useRouter();

  const companyAssistantListQuery = useCompanyAssistantList({ id });

  if (!companyAssistantListQuery.data)
    return <div className="w-32 h-9 rounded-md bg-secondary animate-pulse" />;

  if (companyAssistantListQuery.data.results.length === 0)
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="bg-secondary w-20 h-20 flex items-center justify-center rounded-full">
              <Bot size={30} strokeWidth={1} />
            </div>
            <div>
              <p className="font-medium text-center">No bots found</p>
              <p className="text-sm text-muted-foreground text-center">
                Create your first bot below
              </p>
            </div>
          </div>
          <Button asChild size="sm">
            <Link href={`/c/${id}/create-bot`}>
              <Plus className="mr-2" size={16} />
              <p>Create bot</p>
            </Link>
          </Button>
        </div>
      </div>
    );

  const selectedAssistant = selectedAssistantId
    ? companyAssistantListQuery.data.results.filter(
        (c) => c.id === selectedAssistantId
      )[0]
    : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm bg-white px-3 py-1 rounded-md focus:ring-2 ring-ring focus:outline-none border">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {selectedAssistant ? selectedAssistant.name : "Select bot"}
            </span>
            <ChevronsUpDown size={12} strokeWidth={1} />
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          {companyAssistantListQuery.data.results.map((c) => (
            <DropdownMenuItem
              key={c.id}
              onSelect={() => push(`/c/${id}/bots/${c.id}`)}
            >
              <span>{c.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => push(`/c/${id}/create-bot`)}>
              <span className="font-medium">Create bot</span>
              <Plus size={16} className="ml-3" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
