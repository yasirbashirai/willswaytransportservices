import Link from "next/link";
import { site } from "@/lib/site";
import { IconArrow, IconPhone } from "./icons";

// Thumb-reach action bar on phones: call or start a quote
export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-white/10 bg-ink/95 p-2 backdrop-blur md:hidden">
      <a href={site.phoneHref} className="btn-dark !rounded-xl !py-3 !text-sm"><IconPhone /> Call 24/7</a>
      <Link href="/contact#quote" className="btn-gold !rounded-xl !py-3 !text-sm">Get a Quote <IconArrow /></Link>
    </div>
  );
}
