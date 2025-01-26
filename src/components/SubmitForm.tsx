import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { registerNewUser } from "@/app/fetchData";
import { useRouter } from "next/navigation";
interface UserFormInput {
  name: string;
  buttonAction?: string;
}

export function SubmitForm() {
  const [error, setError] = useState("");
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserFormInput>();

  const onRegister = async (name: string) => {
    try {
      await registerNewUser(name);
      localStorage.setItem("username", name);
      replace("/dashboard");
    } catch (error: unknown) {
      setError(`Registration failed: ${error}`);
    }
  };

  const onSubmit: SubmitHandler<UserFormInput> = async (data) => {
    await onRegister(data.name);
  };

  return (
    <form
      className="flex flex-row gap-4 lg:flex-row"
      onSubmit={handleSubmit(onSubmit)}
    >
      <>
        <div className={"flex flex-col items-start gap-2"}>
          <input
            placeholder={"Your name"}
            {...register("name", { required: true })}
            className="block h-[2.5rem] w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 lg:w-[12rem] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          {errors.name?.type === "required" && (
            <p className="text-sm text-red-700" role="alert">
              Please, enter your name
            </p>
          )}
          <button
            type="submit"
            onClick={() => setValue("buttonAction", "register")}
            className="h-[2.5rem] w-full rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-800 sm:w-auto lg:w-[12rem]"
          >
            Register user
          </button>
        </div>
      </>
      {error}
    </form>
  );
}
