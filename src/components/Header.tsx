"use client";
import DarkmodeToggle from "@/components/DarkmodeToggle";

export function Header() {
  return (
    <header
      className={
        "fixed z-[100] flex h-[4rem] w-full  items-center justify-end bg-gray-100 px-10 shadow dark:bg-gray-800"
      }
    >
      <DarkmodeToggle />
    </header>
  );
}
