"use client";

import { useState } from "react";

interface DocsSidebarLinkGroupProps {
  children: (handleClick: () => void, openGroup: boolean) => React.ReactNode;
  open: boolean;
}

export default function DocsSidebarLinkGroup({
  children,
  open,
}: DocsSidebarLinkGroupProps) {
  const [openGroup, setOpenGroup] = useState<boolean>(open);

  const handleClick = () => {
    setOpenGroup(!openGroup);
  };

  return <li className="mb-1">{children(handleClick, openGroup)}</li>;
}
