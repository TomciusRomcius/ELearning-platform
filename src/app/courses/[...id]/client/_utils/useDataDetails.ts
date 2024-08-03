import { useContext } from "react";
import { DataDetailsContext } from "./dataDetailsContext";

export function useDataDetails() {
  const context = useContext(DataDetailsContext);

  if (!context) {
    throw new Error("Current lesson context is undefined!");
  }

  return context;
}