import { useContext } from "react";
import { ExtensionContext } from "./ExtensionProvider";

export const useExtensionContext = () => {
  const context = useContext(ExtensionContext);

  return context;
};
