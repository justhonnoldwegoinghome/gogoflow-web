interface TypographyH1Props {
  children: string;
}

export function TypographyH1({ children }: TypographyH1Props) {
  return (
    <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
      {children}
    </h1>
  );
}
