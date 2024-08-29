import { Assistant } from "@/features/assistants";
import { User } from "@/features/users";

export interface File {
  id: string;
  uploaded_at: string;
  uploader_id: User["id"];
  assistant_id: Assistant["id"];
  name: string;
}
