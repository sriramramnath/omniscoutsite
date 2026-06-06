import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPostDate, type BlogPost } from "@/data/posts";

export function PostMeta({
  post,
  className,
  size = "default",
}: {
  post: BlogPost;
  className?: string;
  size?: "default" | "compact";
}) {
  const compact = size === "compact";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground",
        compact ? "text-xs" : "text-sm",
        className,
      )}
    >
      <time
        dateTime={post.date}
        className="inline-flex items-center gap-1.5 tabular-nums"
      >
        <Calendar className="h-3.5 w-3.5 flex-shrink-0 opacity-70" />
        {formatPostDate(post.date)}
      </time>

      {post.readingTime && (
        <>
          <span className="h-4 w-px bg-border/60" aria-hidden />
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 flex-shrink-0 opacity-70" />
            {post.readingTime}
          </span>
        </>
      )}
    </div>
  );
}
