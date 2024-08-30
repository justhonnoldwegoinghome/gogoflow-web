import {
  ArrowRight,
  Database,
  FlaskConical,
  LucideIcon,
  Scroll,
  Settings,
} from "lucide-react";
import Link from "next/link";

import { PageWrapper } from "@/layouts";
import { Company } from "@/features/companies";

import { AssistantPageBreadcrumb } from "../components/AssistantPageBreadcrumb";
import { Assistant } from "../types";
import { AssistantBio } from "../components/AssistantBio";

function getHref(
  id: Assistant["id"],
  companyId: Company["id"],
  subPage: "knowledge-center" | "test-logs" | "settings" | "playground"
) {
  return `/c/${companyId}/bots/${id}/${subPage}`;
}

interface AssistantPageProps {
  id: Assistant["id"];
  companyId: Company["id"];
}

export function AssistantPage({ id, companyId }: AssistantPageProps) {
  return (
    <PageWrapper>
      <AssistantPageBreadcrumb id={id} />
      <br />
      <br />
      <AssistantBio id={id} />
      <br />
      <br />
      <div className="flex flex-col gap-4">
        <AssistantSubPageLink
          href={getHref(id, companyId, "knowledge-center")}
          label="Knowledge center"
          Icon={Database}
        />
        <AssistantSubPageLink
          href={getHref(id, companyId, "test-logs")}
          label="Test logs"
          Icon={Scroll}
        />
        <AssistantSubPageLink
          href={getHref(id, companyId, "settings")}
          label="Settings"
          Icon={Settings}
        />
        <AssistantSubPageLink
          href={getHref(id, companyId, "playground")}
          label="Playground"
          Icon={FlaskConical}
        />
      </div>
    </PageWrapper>
  );
}

function AssistantSubPageLink({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      key={label}
      className="flex justify-between border p-8 rounded-xl group hover:ring-2 ring-ring focus:outline-none focus:ring-2"
    >
      <div className="flex items-center gap-2">
        <Icon size={20} strokeWidth={1} />
        <p>{label}</p>
      </div>
      <ArrowRight size={24} strokeWidth={1} />
    </Link>
  );
}
