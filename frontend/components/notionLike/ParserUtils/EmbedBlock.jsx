import { CardContent } from "@/components/ui/card";

export const EmbedBlock = ({ block }) => {
  const { data } = block;

  if (!data?.embed) return null;

  return (
    <div className="mb-10">
      <CardContent className="p-0">
        <div className="relative pb-[56.25%] max-w-[720px] mx-auto rounded-lg overflow-hidden">
          <iframe
            src={data.embed}
            title={data.caption || "Embedded content"}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
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
