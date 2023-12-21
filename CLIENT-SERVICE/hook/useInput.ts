"use client";
import { useState, ChangeEvent } from "react";

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return [value, handleChange] as [typeof value, typeof handleChange];
};
