import Image from "next/image";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <Image
      src="/gopher.png"
      alt=""
      width={size}
      height={Math.round(size * 1.345)}
      priority
      className="drop-shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
      style={{ width: "auto", height: size }}
    />
  );
}
