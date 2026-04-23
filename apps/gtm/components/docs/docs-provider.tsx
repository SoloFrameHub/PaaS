"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type DocsContextProps = {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const DocsContext = createContext<DocsContextProps>({
  sidebarOpen: false,
  setSidebarOpen: (): boolean => false,
});

export default function DocsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <DocsContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </DocsContext.Provider>
  );
}

export const useDocsProvider = () => useContext(DocsContext);
