"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { IconChat, IconFile, IconRoute, IconTruck } from "../icons";

const STEPS = [
  { icon: IconFile, title: "Request", text: "Send the unit, route and timing through the quote form or call us 24/7." },
  { icon: IconRoute, title: "Route & permit check", text: "We review equipment, site access, route and any oversize permit needs." },
  { icon: IconChat, title: "Confirmed schedule", text: "You get a clear plan, a pickup window and one direct point of contact." },
  { icon: IconTruck, title: "Moved & positioned", text: "We pick up, deliver and support placement with your site contact." },
];

// "How a move works" timeline; the gold line fills as you scroll through it
export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const w = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-[8%] right-[8%] top-9 hidden h-[3px] rounded-full bg-line lg:block">
        <motion.div style={{ width: w }} className="h-full rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-deep" />
      </div>
      <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="group text-center"
          >
            <div className="relative mx-auto grid h-[72px] w-[72px] place-items-center rounded-2xl bg-ink text-gold shadow-xl shadow-black/20 transition duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
              <s.icon className="h-7 w-7" />
              <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-gold font-condensed text-[13px] font-semibold text-ink">{i + 1}</span>
            </div>
            <h3 className="mt-6 text-xl font-extrabold">{s.title}</h3>
            <p className="mx-auto mt-2 max-w-[260px] text-[15px] leading-7 text-steel">{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
