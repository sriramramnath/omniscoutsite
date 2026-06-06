import { cn } from "@/lib/utils";

/** Landscape blog thumbnails — consistent 21:9 crop across listing and post pages. */
export function LandscapeThumbnail({
  src,
  alt = "",
  className,
  imgClassName,
  loading = "lazy",
}: {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
}) {
  return (
    <div
      className={cn(
        "relative w-full min-w-0 overflow-hidden bg-muted/20",
        "aspect-[21/9]",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={cn(
          "absolute inset-0 block h-full w-full max-w-full object-cover object-center",
          imgClassName,
        )}
      />
    </div>
  );
}
