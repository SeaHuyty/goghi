"use client";

import { useRef, useState } from "react";
import type { PostImage } from "@/lib/types";

const MIN_RATIO = 4 / 5;
const MAX_RATIO = 1.91;
const FALLBACK_RATIO = 4 / 3; // until real dimensions are known

const clamp = (r: number) => Math.min(MAX_RATIO, Math.max(MIN_RATIO, r));

export function PostImages({ images }: { images: PostImage[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  // Natural ratio per image id: from width/height if the API sends them, else measured on load.
  const [measured, setMeasured] = useState<Record<string, number>>({});

  if (images.length === 0) return null;

  const ratioOf = (img: PostImage) =>
    img.width && img.height ? img.width / img.height : measured[img.id];

  const first = ratioOf(images[0]);
  const box = first ? clamp(first) : FALLBACK_RATIO;

  const onScroll = () => {
    const el = ref.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const measure = (id: string, el: HTMLImageElement | null) => {
    if (!el || !el.complete || !el.naturalWidth) return;
    const r = el.naturalWidth / el.naturalHeight;
    setMeasured((m) => (m[id] === r ? m : { ...m, [id]: r }));
  };

  return (
    <div className="relative overflow-hidden bg-brand-soft">
      <div
        ref={ref}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      >
        {images.map((image, i) => {
          const r = ratioOf(image);
          // Crop only when the image is close to the box; otherwise show it whole.
          const fits = !r || Math.abs(r - box) / box < 0.15;
          return (
            <div
              key={image.id}
              style={{ aspectRatio: box }}
              className="w-full shrink-0 snap-center bg-foreground/[0.04]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- remote user-supplied URLs */}
              <img
                ref={(el) => measure(image.id, el)}
                onLoad={(e) => measure(image.id, e.currentTarget)}
                src={image.url}
                alt={`Photo ${i + 1} of ${images.length}`}
                loading={i === 0 ? "eager" : "lazy"}
                referrerPolicy="no-referrer"
                className={`size-full ${fits ? "object-cover" : "object-contain"}`}
              />
            </div>
          );
        })}
      </div>

      {images.length > 1 && (
        <div
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/35 px-2.5 py-1.5 backdrop-blur-md"
          role="status"
          aria-label={`Photo ${index + 1} of ${images.length}`}
        >
          {images.map((image, i) => (
            <span
              key={image.id}
              className={`h-1.5 rounded-full bg-white transition-all ${
                i === index ? "w-4" : "w-1.5 opacity-50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
