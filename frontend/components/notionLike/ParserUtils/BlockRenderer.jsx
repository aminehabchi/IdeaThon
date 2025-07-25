"use client";
import React from "react";
import { HeaderBlock } from "./HeaderBlock";
import { ParagraphBlock } from "./ParagraphBlock";
import { ListBlock } from "./ListBlock";
import { QuoteBlock } from "./QuoteBlock";
import { CodeBlock } from "./CodeBlock";
import { ImageBlock } from "./ImageBlock";
import { DelimiterBlock } from "./DelimiterBlock";
import { TableBlock } from "./TableBlock";
import { EmbedBlock } from "./EmbedBlock";
import { UnsupportedBlock } from "./UnsupportedBlock";
import { RawBlock } from "./RawBlock";

export const BlockRenderer = ({ block }) => {
  const blockComponents = {
    header: HeaderBlock,
    paragraph: ParagraphBlock,
    list: ListBlock,
    quote: QuoteBlock,
    code: CodeBlock,
    image: ImageBlock,
    delimiter: DelimiterBlock,
    table: TableBlock,
    raw: RawBlock,
    embed: EmbedBlock,
  };

  const Component = blockComponents[block.type] || UnsupportedBlock;
  return <Component key={block.id} block={block} />;
};