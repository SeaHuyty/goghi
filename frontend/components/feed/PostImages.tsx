"use client";

import { useRef, useState } from "react";
import type { PostImage } from "@/lib/types";

// Swipeable (scroll-snap) carousel; a single image renders without controls.
export function PostImages({ images }: { images: PostImage[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const onScroll = () => {
    const el = ref.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-brand-soft">
      <div
        ref={ref}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      >
        {images.map((image, i) => (
          <div key={image.id} className="aspect-[4/3] w-full shrink-0 snap-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- remote user-supplied URLs */}
            <img
              src={image.url}
              alt={`Photo ${i + 1} of ${images.length}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div
          className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5"
          role="status"
          aria-label={`Photo ${index + 1} of ${images.length}`}
        >
          {images.map((image, i) => (
            <span
              key={image.id}
              className={`h-1.5 rounded-full bg-white/90 shadow transition-all ${
                i === index ? "w-5" : "w-1.5 opacity-60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
