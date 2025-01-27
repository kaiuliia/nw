"use client";

import { SubmitForm } from "@/components/SubmitForm";
import { useRouter } from "next/navigation";
import DarkmodeToggle from "@/components/DarkmodeToggle";

export default function Home() {
  const name = localStorage.getItem("username");
  const { replace } = useRouter();

  if (name) {
    replace("/dashboard");
    return;
  }

  return (
    <div className={"p-20 flex flex-col gap-10"}>
      <div className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <h3 className={"text-center"}>Please, enter your name to sign in</h3>
        <SubmitForm />
      </div>
    </div>
  );
}
