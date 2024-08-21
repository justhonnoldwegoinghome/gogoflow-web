import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { formatDate } from "@/utils";
import { TypographySmall } from "@/components/typography";
import { Button } from "@/components/button";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/form";

import { useCompany } from "../api/getCompany";
import { useUpdateCompany } from "../api/updateCompany";
import { Company } from "../types";

interface UpdateCompanyProps {
  id: Company["id"];
}

export function UpdateCompany({ id }: UpdateCompanyProps) {
  const { push } = useRouter();

  const companyQuery = useCompany({ id });

  const updateCompanyMutation = useUpdateCompany({ id });

  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    if (companyQuery.data) setUpdatedName(companyQuery.data.name);
  }, [companyQuery.data]);

  if (!companyQuery.data) return <Spinner />;

  const {
    created_at,
    name,
    shopee_shop_id,
    shopee_is_authorized,
    shopee_authorized_at,
  } = companyQuery.data;

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        updateCompanyMutation.trigger({
          id,
          data: {
            name: updatedName,
          },
        });
      }}
    >
      <div className="max-w-screen-mobile">
        <TypographySmall>Name</TypographySmall>
        <div className="flex gap-4">
          <Input
            value={updatedName}
            onChange={(e) => setUpdatedName(e.currentTarget.value)}
          />
          <Button
            variant={name !== updatedName ? "default" : "secondary"}
            disabled={name === updatedName}
            size="sm"
            isLoading={name !== updatedName && updateCompanyMutation.isMutating}
          >
            Rename
          </Button>
        </div>
      </div>

      <div className="max-w-screen-mobile">
        <TypographySmall>Created</TypographySmall>
        <Input value={formatDate(new Date(created_at))} disabled />
      </div>

      <div className="max-w-screen-mobile">
        <TypographySmall>Shopee connected</TypographySmall>
        <div className="flex gap-4">
          <Input value={shopee_is_authorized ? "Yes" : "No"} disabled />
          {!shopee_is_authorized && (
            <div>
              <Button
                onClick={() => push(`/c/${id}/generate-shopee-auth-link`)}
                size="sm"
              >
                Connect
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-screen-mobile">
        <TypographySmall>Shopee shop ID</TypographySmall>
        <Input value={shopee_shop_id || ""} disabled />
      </div>

      <div className="max-w-screen-mobile">
        <TypographySmall>Shopee connected on</TypographySmall>
        <Input
          value={
            shopee_authorized_at
              ? formatDate(new Date(shopee_authorized_at))
              : ""
          }
          disabled
        />
      </div>
    </form>
  );
}
