import { cn } from "@/utils/cn";
import React, { ReactElement } from "react";

interface Props {}

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        `w-full rounded-xl flex py-4 shadow-sm`,
        props.className
      )}
    />
  );
}
