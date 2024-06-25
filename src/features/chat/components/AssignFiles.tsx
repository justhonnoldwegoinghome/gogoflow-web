import clsx from "clsx";
import { useState } from "react";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/button";
import { Company } from "@/features/companies";
import { File, useCompanyFileList } from "@/features/files";

import { useAssignFiles } from "../api/assignFiles";

interface AssignFilesProps {
  companyId: Company["id"];
  existingFileIdList: File["id"][];
}

export function AssignFiles({
  companyId,
  existingFileIdList,
}: AssignFilesProps) {
  const [selectedFileIdList, setSelectedFileIdList] = useState<File["id"][]>(
    []
  );

  const assignFilesMutation = useAssignFiles({ companyId });

  const companyFileListQuery = useCompanyFileList({ id: companyId });
  if (!companyFileListQuery.data) return <Spinner />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        assignFilesMutation
          .trigger({
            data: { fileIdList: selectedFileIdList },
          })
          .then(() => setSelectedFileIdList([]));
      }}
    >
      <div className="w-fit">
        {companyFileListQuery.data.results
          .filter(({ id }) => !existingFileIdList.includes(id))
          .map((f) => (
            <div key={f.id} className="flex gap-8 justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  selectedFileIdList.includes(f.id)
                    ? setSelectedFileIdList(
                        selectedFileIdList.filter((id) => id != f.id)
                      )
                    : setSelectedFileIdList([...selectedFileIdList, f.id]);
                }}
                className={clsx("p-3 border w-full text-left", {
                  "bg-white": !selectedFileIdList.includes(f.id),
                  "bg-gray-300": selectedFileIdList.includes(f.id),
                })}
              >
                {f.name}
              </button>
            </div>
          ))}
      </div>
      <Button
        disabled={selectedFileIdList.length < 1}
        isLoading={assignFilesMutation.isMutating}
      >
        Submit
      </Button>
    </form>
  );
}
