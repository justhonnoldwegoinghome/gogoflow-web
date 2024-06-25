import { format as DFNFormat } from "date-fns";

export const format = {
  date: (d: Date) => DFNFormat(d, "dd MMMM y"),
  time: (d: Date) => DFNFormat(d, "h:mmaaa"),
};
