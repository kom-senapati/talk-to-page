import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-full flex flex-col p-4 md:p-8 max-w-4xl mx-auto">
      {children}
    </div>
  )
}