import clsx from "clsx";
import Link from "next/link";

import { User } from "@/features/users";

import { useCompany } from "../api/getCompany";
import { Company } from "../types";
import { DeleteCompanyButton } from "./DeleteCompanyButton";

interface CompanyDashboardProps {
  id: Company["id"];
  userId: User["id"];
}

export function CompanyDashboard({ id, userId }: CompanyDashboardProps) {
  const companyQuery = useCompany({ id });

  if (!companyQuery.data) return <div></div>;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div>{`Name: ${companyQuery.data.name}`}</div>
        <div>{`Created at: ${companyQuery.data.created_at}`}</div>
      </div>
      <div>
        <div>{`Shopee shop id: ${companyQuery.data.shopee.shop_id}`}</div>
        <div>{`Shopee is authorized: ${companyQuery.data.shopee.is_authorized}`}</div>
        <div>{`Shopee authorized at: ${companyQuery.data.shopee.authorized_at}`}</div>
        <Link
          href={`/c/${id}/generate-shopee-auth-link`}
          className={clsx("block w-fit p-3", {
            "bg-gray-200": companyQuery.data.shopee.is_authorized,
            "bg-green-200": !companyQuery.data.shopee.is_authorized,
          })}
        >
          Authorize
        </Link>
      </div>
      <div>
        <DeleteCompanyButton id={id} userId={userId} />
      </div>
    </div>
  );
}
