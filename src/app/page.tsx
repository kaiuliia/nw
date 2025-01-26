"use client";

import { SubmitForm } from "@/components/SubmitForm";
import { useRouter } from "next/navigation";

export default function Home() {
  const name = localStorage.getItem("username");
  const { replace } = useRouter();

  if (name) {
    replace("/dashboard");
    return;
  }

  return (
    <div className={"p-20 flex flex-col gap-10"}>
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Please, register</h1>
        <SubmitForm />
      </div>
    </div>
  );
}
