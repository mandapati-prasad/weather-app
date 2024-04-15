import { cn } from "@/utils/cn";
import React, { ReactElement } from "react";

interface Props {
  className?: string;
  showSuggestions: Boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}

export default function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
  className,
}: Props) {
  return (
    <>
      {((showSuggestions && suggestions.length > 0) || error) && (
        <ul
          className={cn(
            "mb-4 bg-white max-h-[300px] overflow-y-auto absolute border top-[44px] right-0 border-gray-300 rounded-md min-w-[250px] flex flex-col gap-1 p-2",
            className
          )}
        >
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1">{error}</li>
          )}
          {suggestions.map((item, i) => {
            return (
              <li
                key={i}
                onClick={() => handleSuggestionClick(item)}
                className="cursor-pointer p-1 rounded hover:bg-gray-200"
              >
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
