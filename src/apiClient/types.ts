import { AxiosError } from "axios";

export type APIError = AxiosError<{ errors: JSONAPIErrorObject[] }>;

// export interface APIError {
//   errors: JSONAPIErrorObject[];
// }

interface JSONAPIErrorObject {
  status: number;
  title: string;
  detail?: string;
  source?: {
    pointer: string;
  };
}
