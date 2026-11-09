"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Faq as FaqItem } from "@/lib/faqs";
import { IconPlus } from "./icons";

// Accessible accordion; first item open by default
export default function Faq({ items, dark = false }: { items: FaqItem[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className={`divide-y ${dark ? "divide-white/10" : "divide-line"}`}>
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q}>
            <button onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-6 py-5 text-left">
              <span className={`font-display text-[17px] font-bold ${dark ? "text-white" : "text-ink"}`}>{f.q}</span>
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition ${on ? "rotate-45 border-gold bg-gold text-ink" : dark ? "border-white/20 text-white" : "border-line text-ink"}`}>
                <IconPlus />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                  <p className={`pb-6 pr-12 text-[15.5px] leading-7 ${dark ? "text-white/65" : "text-steel"}`}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
