import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { registerNewUser } from "@/lib/actions/register";
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
    } catch {
      setError("Registration failed");
    }
  };

  const onSubmit: SubmitHandler<UserFormInput> = async (data) => {
    await onRegister(data.name);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={"flex flex-col lg:flex-row items-start gap-2"}>
        <div className={"flex flex-col gap-1"}>
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
        </div>
        <button
          type="submit"
          onClick={() => setValue("buttonAction", "register")}
          className="h-[2.5rem] w-full rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-800"
        >
          Register user
        </button>
      </div>

      {error}
    </form>
  );
}
