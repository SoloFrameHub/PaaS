import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import DocsBanner from "./docs-banner";
import DocsAccordion from "./docs-accordion";
import DocsTable, {
  DocsTableHead,
  DocsTableBody,
  DocsTableHeadRow,
  DocsTableBodyRow,
  DocsTableTh,
  DocsTableTd,
} from "./docs-table";
import DocsTag from "./docs-tag";
import Link from "next/link";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const transformToSlug = (input: string) => {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .join("-")
    .split("&")
    .join("-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

const generateHeading = (headingLevel: number) => {
  return ({ children }: { children: React.ReactNode }) => {
    const textContent = React.Children.toArray(children).join("");
    const slug = transformToSlug(textContent);
    return React.createElement(`h${headingLevel}`, { id: slug }, [
      React.createElement("a", {
        href: `#${slug}`,
        key: `link-${slug}`,
        className: "anchor-link",
      }),
      textContent,
    ]);
  };
};

const mdxComponents = {
  h1: generateHeading(1),
  h2: generateHeading(2),
  h3: generateHeading(3),
  h4: generateHeading(4),
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href}>{children}</Link>
  ),
  Banner: DocsBanner,
  Accordion: DocsAccordion,
  Tag: DocsTag,
  Table: DocsTable,
  THead: DocsTableHead,
  TBody: DocsTableBody,
  ThRow: DocsTableHeadRow,
  TbRow: DocsTableBodyRow,
  Th: DocsTableTh,
  Td: DocsTableTd,
};

export function DocsCustomMDX(props: {
  source: string;
  components?: Record<string, React.ComponentType>;
}) {
  const rehypePrettyCodeOptions = {
    theme: "one-dark-pro",
    keepBackground: false,
    onVisitLine(node: { children: { type: string; value: string }[] }) {
      if (node.children.length === 0) {
        node.children = [{ type: "text", value: " " }];
      }
    },
  };

  return (
    <MDXRemote
      source={props.source}
      components={{ ...mdxComponents, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions] as any],
        },
      }}
    />
  );
}
