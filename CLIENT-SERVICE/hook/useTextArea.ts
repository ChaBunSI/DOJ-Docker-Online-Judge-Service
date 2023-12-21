"use client";
import { useState, ChangeEvent } from "react";

export const useTextArea = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return [value, handleChange] as [typeof value, typeof handleChange];
};
