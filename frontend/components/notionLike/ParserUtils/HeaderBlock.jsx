"use client";
import React from "react";

export const HeaderBlock = ({ block }) => {
  const { data } = block;
  const HeaderTag = `h${data.level || 2}`;
  
  const headerClasses = {
    1: "text-4xl font-bold mb-6 text-foreground",
    2: "text-3xl font-semibold mb-5 text-foreground",
    3: "text-2xl font-semibold mb-4 text-foreground",
    4: "text-xl font-medium mb-3 text-foreground",
  };

  return React.createElement(
    HeaderTag,
    {
      id: data.anchor,
      className: headerClasses[data.level || 2],
      style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }
    },
    data.text
  );
};
