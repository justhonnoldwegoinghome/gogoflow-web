import { AxiosError } from "axios";

export type APIError = AxiosError<{ errors: JSONAPIErrorObject[] }>;

interface JSONAPIErrorObject {
  status: number;
  title: string;
  detail?: string;
  source?: {
    pointer: string;
  };
}

export interface APIList<ResultType> {
  next_page_token: string | null;
  results: ResultType[];
}
