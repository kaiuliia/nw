"use client";

import { SubmitForm } from "@/components/submitForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { replace } = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) {
      replace("/dashboard");
      return;
    }
  }, []);

  return (
    <div className={"p-20 flex flex-col gap-10"}>
      <div className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <h3 className={"text-center"}>Please, enter your name to sign in</h3>
        <SubmitForm />
      </div>
    </div>
  );
}
