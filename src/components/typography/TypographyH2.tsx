interface TypographyH2Props {
  children: string;
}

export function TypographyH2({ children }: TypographyH2Props) {
  return (
    <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}
