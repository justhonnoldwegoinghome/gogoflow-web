import { ReactNode } from "react";

interface FormWrapperProps {
  title?: string;
  form: ReactNode;
  submitButton?: ReactNode;
}

export function FormContainer({ title, form, submitButton }: FormWrapperProps) {
  return (
    <div className="p-6 rounded-lg bg-white w-full max-w-screen-tablet min-w-[350px]">
      <div className="flex flex-col gap-8">
        {title && <p className="text-2xl font-semibold text-center">{title}</p>}

        <div>{form}</div>

        {submitButton && <div className="w-fit ml-auto">{submitButton}</div>}
      </div>
    </div>
  );
}
