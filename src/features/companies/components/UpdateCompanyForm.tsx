import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { formatDate } from "@/utils";
import { Button } from "@/components/button";
import { Input } from "@/components/form";

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
    <form
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
      <div className="p-6 rounded-lg bg-white w-full max-w-screen-tablet min-w-[350px] flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Name</label>
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
            <label className="text-sm font-medium mb-1 block">
              Shopee connected
            </label>
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
            <label className="text-sm font-medium mb-1 block">
              Shopee shop ID
            </label>
            <Input value={shopee_shop_id || ""} disabled />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">
              Shopee connected on
            </label>
            <Input
              value={
                shopee_authorized_at
                  ? formatDate(new Date(shopee_authorized_at))
                  : ""
              }
              disabled
            />
          </div>
        </div>
      </div>
    </form>
  );
}
