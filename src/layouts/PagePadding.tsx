import { ReactNode } from "react";

interface PagePaddingProps {
  children: ReactNode;
}

export function PagePadding({ children }: PagePaddingProps) {
  return <div className="px-4 pt-8 pb-24">{children}</div>;
}
