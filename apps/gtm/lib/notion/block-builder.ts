/**
 * Converts markdown-formatted artifact content to Notion block format.
 * Simple approach: parse the markdown string into Notion-compatible blocks.
 */

import type { NotionBlock } from "./types";

export function markdownToNotionBlocks(markdown: string): NotionBlock[] {
  const blocks: NotionBlock[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("### ")) {
      blocks.push(heading3(trimmed.slice(4)));
    } else if (trimmed.startsWith("## ")) {
      blocks.push(heading2(trimmed.slice(3)));
    } else if (trimmed.startsWith("# ")) {
      blocks.push(heading1(trimmed.slice(2)));
    } else if (trimmed.startsWith("- ")) {
      blocks.push(bulletItem(trimmed.slice(2)));
    } else if (/^\d+\.\s/.test(trimmed)) {
      blocks.push(numberedItem(trimmed.replace(/^\d+\.\s/, "")));
    } else if (trimmed.startsWith("> ")) {
      blocks.push(quote(trimmed.slice(2)));
    } else if (trimmed === "---") {
      blocks.push(divider());
    } else {
      blocks.push(paragraph(trimmed));
    }
  }

  return blocks;
}

function richText(text: string): { type: "text"; text: { content: string } }[] {
  // Handle bold (**text**)
  const parts: {
    type: "text";
    text: { content: string };
    annotations?: { bold: boolean };
  }[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        text: { content: text.slice(lastIndex, match.index) },
      });
    }
    parts.push({
      type: "text",
      text: { content: match[1] },
      annotations: { bold: true },
    });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", text: { content: text.slice(lastIndex) } });
  }

  return parts.length > 0 ? parts : [{ type: "text", text: { content: text } }];
}

function heading1(text: string): NotionBlock {
  return {
    object: "block",
    type: "heading_1",
    heading_1: { rich_text: richText(text) },
  };
}

function heading2(text: string): NotionBlock {
  return {
    object: "block",
    type: "heading_2",
    heading_2: { rich_text: richText(text) },
  };
}

function heading3(text: string): NotionBlock {
  return {
    object: "block",
    type: "heading_3",
    heading_3: { rich_text: richText(text) },
  };
}

function paragraph(text: string): NotionBlock {
  return {
    object: "block",
    type: "paragraph",
    paragraph: { rich_text: richText(text) },
  };
}

function bulletItem(text: string): NotionBlock {
  return {
    object: "block",
    type: "bulleted_list_item",
    bulleted_list_item: { rich_text: richText(text) },
  };
}

function numberedItem(text: string): NotionBlock {
  return {
    object: "block",
    type: "numbered_list_item",
    numbered_list_item: { rich_text: richText(text) },
  };
}

function quote(text: string): NotionBlock {
  return {
    object: "block",
    type: "quote",
    quote: { rich_text: richText(text) },
  };
}

function divider(): NotionBlock {
  return { object: "block", type: "divider", divider: {} };
}
