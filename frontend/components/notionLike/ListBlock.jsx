import React from "react";

export const ListBlock = ({ block }) => {
  const { data } = block;

  if (data.style === "checklist") {
    return (
      <div className="mb-4 space-y-2">
        {data.items?.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            <input type="checkbox" checked={item.checked || false} readOnly className="w-4 h-4" />
            <div className="text-base text-foreground leading-relaxed flex-1" dangerouslySetInnerHTML={{
              __html: typeof item === 'string' ? item : item.content || item
            }} />
          </div>
        ))}
      </div>
    );
  }

  const ListTag = data.style === "ordered" ? "ol" : "ul";

  return (
    <ListTag className="list-inside mb-4 space-y-2">
      {data.items?.map((item, index) => (
        <li
          key={index}
          className="text-base text-foreground leading-relaxed ml-4"
          dangerouslySetInnerHTML={{
            __html: typeof item === 'string' ? item : item.content || item
          }}
        />
      ))}
    </ListTag>
  );
};