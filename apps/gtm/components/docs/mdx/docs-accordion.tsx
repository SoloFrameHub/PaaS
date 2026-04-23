"use client";
import { useState, useRef, useEffect } from "react";

interface DocsAccordionProps {
  title: string;
  active?: boolean;
  children: React.ReactNode;
}

export default function DocsAccordion({
  title,
  active = false,
  children,
}: DocsAccordionProps) {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
  const accordion = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAccordionOpen(active);
  }, [accordion]);

  return (
    <div className="mb-3 prose-p:m-0" ref={accordion}>
      <button
        className="flex items-center w-full text-slate-800 font-medium text-left dark:text-slate-200"
        onClick={(e) => {
          e.preventDefault();
          setAccordionOpen(!accordionOpen);
        }}
        aria-expanded={accordionOpen}
      >
        <div className="shrink-0 mr-3">
          <svg
            className={`fill-slate-400 dark:fill-slate-500 ${accordionOpen && "rotate-90"}`}
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="12"
          >
            <path d="m4.586 6-4-4L2 .586 7.414 6 2 11.414.586 10z" />
          </svg>
        </div>
        <span>{title}</span>
      </button>
      <div className={`${!accordionOpen ? "hidden" : ""}`}>
        <div className="pl-5 mt-2">{children}</div>
      </div>
    </div>
  );
}
