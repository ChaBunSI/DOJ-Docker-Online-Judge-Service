"use client";

import { SubmitDataInterface } from "@/global";
import { Editor } from "@monaco-editor/react";

export default function ViewEditor({
  submitData,
}: {
  submitData: SubmitDataInterface;
}) {
  return (
    <Editor
      height="250px"
      theme="vs-dark"
      language={
        submitData.language_code === 0
          ? "cpp"
          : submitData.language_code === 1
          ? "cpp"
          : submitData.language_code === 2
          ? "java"
          : "python"
      }
      defaultValue={submitData.source}
      options={{
        readOnly: true,
        minimap: {
          enabled: false,
        },
      }}
    />
  );
}
