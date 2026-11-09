import Image from "next/image";

// Brand lockups extracted from the client's .ai file (transparent SVG)
export default function Logo({ variant = "dark", className = "h-11 w-auto" }: { variant?: "dark" | "light"; className?: string }) {
  // "dark" = for dark backgrounds (white W), "light" = for light backgrounds (black W)
  const src = variant === "dark" ? "/images/brand/logo-dark.svg" : "/images/brand/logo-light.svg";
  return <Image src={src} alt="Wills Way Transport Services LLC" width={1233} height={239} className={className} preload unoptimized />;
}
