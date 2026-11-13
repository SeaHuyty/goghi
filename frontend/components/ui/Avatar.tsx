import type { Author } from "@/lib/types";

const sizes = {
  sm: "size-9 text-xs",
  md: "size-11 text-sm",
  xl: "size-24 text-3xl sm:size-28",
} as const;

export function Avatar({
  author,
  size = "md",
  ring = false,
}: {
  author: Pick<Author, "name" | "image_url">;
  size?: keyof typeof sizes;
  ring?: boolean;
}) {
  const initials = author.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className={`${sizes[size]} inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-soft font-semibold text-link ${
        ring ? "ring-2 ring-brand ring-offset-2 ring-offset-card" : ""
      }`}
    >
      {author.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element -- remote user-supplied URLs
        <img
          src={author.image_url}
          alt=""
          referrerPolicy="no-referrer"
          className="size-full object-cover"
        />
      ) : (
        initials
      )}
    </span>
  );
}
