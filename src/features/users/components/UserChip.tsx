import { useUser } from "../api/getUser";
import { User } from "../types";

interface UserChipProps {
  id: User["id"];
}

export function UserChip({ id }: UserChipProps) {
  const userQuery = useUser({ id });

  if (!userQuery.data) return <div></div>;

  return <div>{userQuery.data.email}</div>;
}
