import useSWR from "swr";

import { get } from "@/apiClient";

import { File } from "../types";

export function getFile({ id }: { id: File["id"] }) {
  return get<File>(`/files/${id}`);
}

export function useFile({ id }: { id: File["id"] }) {
  return useSWR(`/files/${id}`, () => getFile({ id }));
}
