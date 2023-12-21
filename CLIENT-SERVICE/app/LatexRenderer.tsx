"use client";

import Latex from "react-latex-next";
import "katex/dist/katex.min.css";

export default function LatexRenderer({ children }: any) {
  return <Latex>{children}</Latex>;
}
