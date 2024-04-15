import { cn } from "@/utils/cn";
import React, { ReactElement } from "react";
import { IoSearch } from "react-icons/io5";

interface Props {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

export default function SearchBox({
  className,
  value,
  onChange,
  onSubmit,
}: Props): ReactElement {
  return (
    <form
      action=""
      className={cn("flex w-full", className)}
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder="location..."
        value={value}
        onChange={onChange}
        className="border-r-0 bg-black bg-opacity-50  text-white rounded-l-md focus:outline-none w-full px-2 py-2"
      />
      <button
        type="submit"
        className="px-4 bg-yellow-400 bg-opacity-75 rounded-r-md text-black"
      >
        <IoSearch />
      </button>
    </form>
  );
}
