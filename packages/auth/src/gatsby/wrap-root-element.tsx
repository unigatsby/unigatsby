import React from "react";
import { AuthProvider } from "..";

export function wrapRootElement({ element }: { element: React.ReactNode }) {
  return <AuthProvider>{element}</AuthProvider>;
}
