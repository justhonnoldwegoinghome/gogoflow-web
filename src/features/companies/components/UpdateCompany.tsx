import { useRouter } from "next/router";

import { format } from "@/utils/format";
import { TypographySmall } from "@/components/typography";
import { Button } from "@/components/button";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/form";

import { useCompany } from "../api/getCompany";
import { Company } from "../types";

interface UpdateCompanyProps {
  id: Company["id"];
}

export function UpdateCompany({ id }: UpdateCompanyProps) {
  const { push } = useRouter();

  const companyQuery = useCompany({ id });
  if (!companyQuery.data) return <Spinner />;
  const { created_at, name, shopee } = companyQuery.data;

  return (
    <div>
      <div className="flex flex-col gap-4">
        {[
          {
            header: "Name",
            value: name,
            disabled: false,
          },
          {
            header: "Created on",
            value: format.date(new Date(created_at)),
            disabled: true,
          },
          {
            header: "Shopee connected",
            value: shopee.is_authorized ? "Yes" : "No",
            disabled: true,
          },
          {
            header: "Shopee shop ID",
            value: shopee.shop_id || "",
            disabled: true,
          },
          {
            header: "Shopee connected on",
            value: shopee.authorized_at
              ? format.date(new Date(shopee.authorized_at))
              : "",
            disabled: true,
          },
        ].map(({ header, value, disabled }) => (
          <div key={header} className="flex gap-4 items-end">
            <div className="flex flex-col gap-1">
              <TypographySmall>{header}</TypographySmall>
              <Input
                id={header}
                value={value}
                disabled={disabled}
                onChange={() => null}
              />
            </div>
            {!disabled && <Button>Update</Button>}
          </div>
        ))}
      </div>
      <br />
      {!shopee.is_authorized && (
        <div>
          <Button
            onClick={() => push(`/c/${id}/generate-shopee-auth-link`)}
            variant="link"
          >
            Connect to Shopee
          </Button>
        </div>
      )}
    </div>
  );
}
