import Link from "next/link";

import { User } from "@/features/users";
import { CompanyFileList } from "@/features/files";

import { useCompany } from "../api/getCompany";
import { Company } from "../types";
import { DeleteCompanyButton } from "./DeleteCompanyButton";

interface CompanyDashboardProps {
  id: Company["id"];
  userId: User["id"];
}

export function CompanyDashboard({ id, userId }: CompanyDashboardProps) {
  const companyQuery = useCompany({ id });

  if (!companyQuery.data) return <div>Spinner</div>;

  const { created_at, admin_id, member_id_list, name, shopee } =
    companyQuery.data;

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="font-semibold">About the company</h2>
        <p>{`Name: ${name}`}</p>
        <p>{`Created at: ${created_at}`}</p>
        <p>{`Admin id: ${admin_id}`}</p>
        <p>{`Member ids: ${member_id_list}`}</p>
      </div>
      <div>
        <h2 className="font-semibold">Company's files</h2>
        <CompanyFileList id={id} />
      </div>

      <div>
        <h2 className="font-semibold">About the company's shopee account</h2>
        <div>{`Shop id: ${shopee.shop_id}`}</div>
        <div>{`Is authorized: ${shopee.is_authorized}`}</div>
        <div>{`Authorized at: ${shopee.authorized_at}`}</div>
        <Link
          href={`/c/${id}/generate-shopee-auth-link`}
          className="block w-fit p-3 bg-blue-300"
        >
          Authorize
        </Link>
      </div>

      <div>
        <h2 className="font-semibold">Features</h2>
        <Link href={`/c/${id}/chat`}>Chat</Link>
      </div>

      <div>
        <h2 className="font-semibold">Company settings</h2>
        <DeleteCompanyButton id={id} userId={userId} />
      </div>
    </div>
  );
}
