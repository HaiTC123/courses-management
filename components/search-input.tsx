"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ChangeEventHandler, SetStateAction, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  const onChangeHandler = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute w-4 h-4 top-3 left-3 text-slate-600" />
      <Input
        value={value}
        onChange={onChangeHandler}
        placeholder="Tìm kiếm..."
        className="w-full md:w-[300px] pl-9 rounded-full focus-visible:ring-slate-200"
      />
    </div>
  );
};
