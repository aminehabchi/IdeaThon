import { CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export const WarningBlock = ({ block }) => {
  const { data } = block;

  if (!data?.message) return null;

  return (
    <div className="mb-10">
      <CardContent className="p-0">
        <div className="max-w-[720px] mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-yellow-800 font-medium mb-1">
                  {data.title || "Warning"}
                </div>
                <div className="text-yellow-700 text-sm leading-relaxed">
                  {data.message}
                </div>
              </div>
            </div>
          </div>
        </div>

        {data.caption && (
          <div className="bg-muted py-2 px-4 mt-2 max-w-[720px] mx-auto rounded-b-lg">
            <p className="text-sm text-muted-foreground text-center italic">
              {data.caption}
            </p>
          </div>
        )}
      </CardContent>
    </div>
  );
};