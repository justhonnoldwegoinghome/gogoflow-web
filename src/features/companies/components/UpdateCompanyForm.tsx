import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { formatDate } from "@/utils";
import { TypographySmall } from "@/components/typography";
import { Button } from "@/components/button";
import { FormContainer, Input } from "@/components/form";

import { useUpdateCompany } from "../api/updateCompany";
import { Company } from "../types";

interface UpdateCompanyFormProps {
  id: Company["id"];
  company: Company;
}

export function UpdateCompanyForm({ id, company }: UpdateCompanyFormProps) {
  const { push } = useRouter();

  const updateCompanyMutation = useUpdateCompany({ id });

  const [updatedName, setUpdatedName] = useState(company.name);

  useEffect(() => setUpdatedName(company.name), [company]);

  const nameIsUpdated = useMemo(
    () => company.name !== updatedName,
    [updatedName, company]
  );

  const { shopee_shop_id, shopee_is_authorized, shopee_authorized_at } =
    company;

  return (
    <FormContainer
      form={
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
          <div>
            <TypographySmall>Name</TypographySmall>
            <div className="flex gap-4">
              <Input
                value={updatedName}
                onChange={(e) => setUpdatedName(e.currentTarget.value)}
              />
              <Button
                variant={nameIsUpdated ? "default" : "secondary"}
                disabled={!nameIsUpdated}
                size="sm"
                isLoading={updateCompanyMutation.isMutating}
              >
                Rename
              </Button>
            </div>
          </div>

          <div>
            <TypographySmall>Shopee connected</TypographySmall>
            <div className="flex gap-4">
              <Input value={shopee_is_authorized ? "Yes" : "No"} disabled />
              <Button
                variant={shopee_is_authorized ? "secondary" : "default"}
                onClick={() => push(`/c/${id}/generate-shopee-auth-link`)}
                size="sm"
                disabled={shopee_is_authorized}
              >
                Connect
              </Button>
            </div>
          </div>

          <div>
            <TypographySmall>Shopee shop ID</TypographySmall>
            <Input value={shopee_shop_id || ""} disabled />
          </div>

          <div>
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
      }
    />
  );
}
