import React from "react";
import { Check } from "lucide-react";

export const ListBlock = ({ block }) => {
  const { data } = block;

  // Handle checklist style
  if (data.style === "checklist") {
    return (
      <div className="mb-6 space-y-3">
        {data.items?.map((item, index) => {
          const isChecked = typeof item === 'object' ? item.checked : false;
          const content = typeof item === 'string' ? item : item.content || item.text || '';
          
          return (
            <div key={index} className="flex items-start gap-3 group">
              <div className="relative flex-shrink-0 mt-0.5">
                <div className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                  ${isChecked 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-muted-foreground/30 hover:border-muted-foreground/50'
                  }
                `}>
                  {isChecked && <Check size={12} strokeWidth={3} />}
                </div>
              </div>
              <div 
                className={`
                  text-base leading-relaxed flex-1 transition-all
                  ${isChecked 
                    ? 'text-muted-foreground line-through' 
                    : 'text-foreground'
                  }
                `}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          );
        })}
      </div>
    );
  }

  // Handle ordered and unordered lists
  const ListTag = data.style === "ordered" ? "ol" : "ul";
  const listClassName = data.style === "ordered" 
    ? "list-decimal list-outside mb-6 space-y-2 pl-6" 
    : "list-disc list-outside mb-6 space-y-2 pl-6";

  return (
    <ListTag className={listClassName}>
      {data.items?.map((item, index) => {
        const content = typeof item === 'string' ? item : item.content || item.text || '';
        
        return (
          <li
            key={index}
            className="text-base text-foreground leading-relaxed pl-2"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      })}
    </ListTag>
  );
};