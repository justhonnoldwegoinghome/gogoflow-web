import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface AssistantSubpageLinkProps {
  href: string;
  children: string;
  Icon: LucideIcon;
}

export function AssistantSubpageLink({
  href,
  children,
  Icon,
}: AssistantSubpageLinkProps) {
  return (
    <Link
      href={href}
      className="flex justify-between border p-8 rounded-xl group hover:ring-2 ring-ring focus:outline-none focus:ring-2"
    >
      <div className="flex items-center gap-2">
        <Icon size={20} strokeWidth={1} />
        <p>{children}</p>
      </div>
      <ArrowRight size={24} strokeWidth={1} />
    </Link>
  );
}
