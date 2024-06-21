import clsx from "clsx";
import { useState } from "react";

import { File, useCompanyFileList } from "@/features/files";
import { Company } from "@/features/companies";

import { useAssignFilesToChat } from "../api/assignFilesToChat";

interface AssignFilesToChatFormProps {
  companyId: Company["id"];
  existingFileIdList: File["id"][];
}

export function AssignFilesToChatForm({
  companyId,
  existingFileIdList,
}: AssignFilesToChatFormProps) {
  const companyFileListQuery = useCompanyFileList({ id: companyId });
  const assignFilesToChatMutation = useAssignFilesToChat({ companyId });

  const [selectedFileIdList, setSelectedFileIdList] = useState<File["id"][]>(
    []
  );

  if (!companyFileListQuery.data) return <div>Spinner</div>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        assignFilesToChatMutation
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
      <button type="submit" className="p-3 bg-green-300">
        {assignFilesToChatMutation.isMutating ? "Spinner" : "Submit"}
      </button>
    </form>
  );
}
