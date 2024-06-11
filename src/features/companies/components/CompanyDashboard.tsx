import { useCompany } from "../api/getCompany";
import { Company } from "../types";

interface CompanyDashboardProps {
  id: Company["id"];
}

export function CompanyDashboard({ id }: CompanyDashboardProps) {
  const companyQuery = useCompany({ id });

  if (!companyQuery.data) return <div></div>;

  return (
    <div>
      <div>{`Name: ${companyQuery.data.name}`}</div>
      <div>{`Created at: ${companyQuery.data.created_at}`}</div>
      <div>{`Shopee shop id: ${companyQuery.data.shopee.shop_id}`}</div>
      <div>{`Shopee is authorized: ${companyQuery.data.shopee.is_authorized}`}</div>
      <div>{`Shopee authorized at: ${companyQuery.data.shopee.authorized_at}`}</div>
    </div>
  );
}
