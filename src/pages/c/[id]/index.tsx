import { useEffect } from "react";
import { useRouter } from "next/router";

import { Spinner } from "@/components/spinner";

export default function Page() {
  const { query, push } = useRouter();
  let { id } = query;

  useEffect(() => {
    if (id) push(`/c/${id}/bots`);
  }, [id]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
}
