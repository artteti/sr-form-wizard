import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};
export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h2 className="text-2xl text-center text-blue-500 font-bold my-4">
        {title}
      </h2>
      <div className="grid justify-start gap-4 flex-start grid-cols-[auto_400px]">
        {children}
      </div>
    </>
  );
}
