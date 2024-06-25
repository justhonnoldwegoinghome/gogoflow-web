interface TypographySmallProps {
  children: string;
}

export function TypographySmall({ children }: TypographySmallProps) {
  return <small className="text-sm font-medium leading-none">{children}</small>;
}
