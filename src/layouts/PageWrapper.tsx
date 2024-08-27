import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="px-4 pt-8 pb-24">
      <div className="max-w-screen-tablet mx-auto">{children}</div>
    </div>
  );
}
