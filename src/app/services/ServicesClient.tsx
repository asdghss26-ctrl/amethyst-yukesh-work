"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { treatments, Treatment } from "@/lib/data/treatments";
import { Reveal } from "@/components/ui/RevealAnimation";

interface ServicesClientProps {
  initialCategory?: string;
}

const CATEGORIES = [
  { id: "medical-dermatology", label: "Medical Dermatology", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" /></svg> },
  { id: "hair-loss", label: "Hair Loss", icon: <svg viewBox="0 0 122.88 114.43" fill="currentColor" width="16" height="16"><path d="M57.75,96.69c-3.67-0.85-5.98-3.19-7.34-6.24c-1.26-2.84-1.66-6.3-1.59-9.69c0.07-3.3,0.59-6.55,1.17-9.1 c0.98-4.22,2.38-8.26,4.15-12.18c1.77-3.9,3.9-7.67,6.31-11.32c0.03-0.04,0.06-0.09,0.09-0.13c7.2-9.38,15.79-18.21,25.47-26.27 c9.68-8.06,20.46-15.32,32.01-21.55c0.38-0.2,0.8-0.25,1.18-0.16c0.73-0.17,1.5,0.16,1.87,0.85c0.44,0.81,0.15,1.82-0.64,2.28 c-6.43,4.07-12.76,8.83-18.66,14.14c-5.58,5.02-10.75,10.51-15.2,16.35c-5.84,7.65-9.09,13.21-10.87,18.48 c-1.78,5.25-2.15,10.31-2.25,16.92c-0.02,1.21,0.03,2.66,0.08,4.21c0.06,2,0.13,4.19,0.08,6.41 C73.37,91.61,68.68,99.13,57.75,96.69L57.75,96.69z M3.4,111.29h116.08V58.57c0-1.82-0.6-2.36-1.35-2.36 c-1.32,0-3.15,0.81-4.47,1.41c-0.24,0.11-0.47,0.21-0.59,0.26c-7.27,3.16-8.64,2.6-12.96,0.83c-1.13-0.46-2.5-1.03-4.37-1.63 c-3.96-1.28-7.4-2.13-9.6-1.25c-2.03,0.81-3.24,3.41-3.21,9.13c0,0.83,0.03,1.7,0.06,2.56c0.03,0.82,0.05,1.63,0.06,2.48 c0.01,2.07,0.1,4.02,0.18,5.83c0.11,2.51,0.2,4.77,0.1,7c-1.38,26.97-35.4,30.8-42.58,7.14c-1.4-4.6-1.51-10.04-0.58-16.2 c0.79-5.16,2.34-10.85,4.51-17c-6.14,1.67-12.22,2.66-18.25,2.76c-7.01,0.11-13.9-0.99-20.65-3.61C5.16,56,4.6,56.27,4.18,56.69 C3.7,57.17,3.4,57.83,3.4,58.57V111.29L3.4,111.29z M122.88,114.43H0c0-16.76,0-39.1,0-55.86c0-1.67,0.68-3.19,1.78-4.28 c1.09-1.09,2.61-1.78,4.28-1.78c0.24,0,0.47,0.05,0.67,0.14c6.43,2.53,12.99,3.6,19.66,3.49c6.72-0.11,13.58-1.4,20.54-3.56 c0.9-0.27,1.85,0.23,2.12,1.12c0.12,0.37,0.1,0.75-0.03,1.09l0,0c-2.7,7.14-4.59,13.67-5.49,19.47c-0.87,5.69-0.78,10.63,0.45,14.7 c6.1,20.07,34.77,16.81,35.95-6.33c0.11-2.09,0.01-4.27-0.1-6.69c-0.08-1.81-0.17-3.74-0.18-5.96c0-0.74-0.03-1.56-0.06-2.39 c-0.03-0.85-0.06-1.71-0.06-2.66c-0.04-7.4,1.97-10.94,5.33-12.29c3.18-1.28,7.29-0.32,11.9,1.17c1.93,0.63,3.39,1.22,4.61,1.72 c3.31,1.36,4.37,1.79,10.33-0.8c0.24-0.11,0.4-0.18,0.57-0.24c1.62-0.72,3.84-1.71,5.86-1.71c2.66,0.02,4.75,1.36,4.75,5.78l0,0 C122.88,75.33,122.88,97.68,122.88,114.43L122.88,114.43z M9.38,61.43c1.25,0,2.27,1.02,2.27,2.27c0,1.25-1.02,2.27-2.27,2.27 c-1.25,0-2.27-1.02-2.27-2.27C7.11,62.44,8.13,61.43,9.38,61.43L9.38,61.43L9.38,61.43z M113.38,61.59c1.25,0,2.27,1.02,2.27,2.27 c0,1.25-1.02,2.27-2.27,2.27c-1.25,0-2.27-1.02-2.27-2.27C111.11,62.61,112.12,61.59,113.38,61.59L113.38,61.59L113.38,61.59z M100.97,62.5c1.25,0,2.27,1.02,2.27,2.27c0,1.25-1.02,2.27-2.27,2.27c-1.25,0-2.27-1.02-2.27-2.27 C98.7,63.52,99.72,62.5,100.97,62.5L100.97,62.5L100.97,62.5z M105.66,68.71c1.25,0,2.27,1.02,2.27,2.27 c0,1.25-1.02,2.27-2.27,2.27s-2.27-1.02-2.27-2.27C103.39,69.72,104.41,68.71,105.66,68.71L105.66,68.71L105.66,68.71z M94.47,67.95c1.25,0,2.27,1.02,2.27,2.27c0,1.25-1.02,2.27-2.27,2.27s-2.27-1.02-2.27-2.27C92.19,68.97,93.21,67.95,94.47,67.95 L94.47,67.95L94.47,67.95z M88.57,61.9c1.25,0,2.27,1.02,2.27,2.27s-1.02,2.27-2.27,2.27c-1.25,0-2.27-1.02-2.27-2.27 C86.29,62.91,87.31,61.9,88.57,61.9L88.57,61.9L88.57,61.9z M34.19,61.13c1.25,0,2.27,1.02,2.27,2.27c0,1.25-1.02,2.27-2.27,2.27 c-1.25,0-2.27-1.02-2.27-2.27C31.92,62.14,32.93,61.13,34.19,61.13L34.19,61.13L34.19,61.13z M21.79,62.03 c1.25,0,2.27,1.02,2.27,2.27s-1.02,2.27-2.27,2.27c-1.25,0-2.27-1.02-2.27-2.27S20.54,62.03,21.79,62.03L21.79,62.03L21.79,62.03z M26.48,68.23c1.25,0,2.27,1.02,2.27,2.27c0,1.25-1.02,2.27-2.27,2.27c-1.25,0-2.27-1.02-2.27-2.27 C24.21,69.24,25.23,68.23,26.48,68.23L26.48,68.23L26.48,68.23z M15.28,67.48c1.25,0,2.27,1.02,2.27,2.27s-1.02,2.27-2.27,2.27 c-1.25,0-2.27-1.02-2.27-2.27S14.03,67.48,15.28,67.48L15.28,67.48L15.28,67.48z"/></svg> },
  { id: "acne-scar", label: "Acne Scar", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M10.5 3l1.5 5.5L17.5 10l-5.5 1.5L10.5 17l-1.5-5.5L3.5 10l5.5-1.5z" /><path d="M18 16l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" /></svg> },
  { id: "pigmentation", label: "Pigmentation", icon: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 6a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zM21 11h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2zM6 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1zM6.22 5a1 1 0 0 0-1.39 1.47l1.44 1.39a1 1 0 0 0 .73.28 1 1 0 0 0 .72-.31 1 1 0 0 0 0-1.41zM17 8.14a1 1 0 0 0 .69-.28l1.44-1.39A1 1 0 0 0 17.78 5l-1.44 1.42a1 1 0 0 0 0 1.41 1 1 0 0 0 .66.31zM12 18a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1zM17.73 16.14a1 1 0 0 0-1.39 1.44L17.78 19a1 1 0 0 0 .69.28 1 1 0 0 0 .72-.3 1 1 0 0 0 0-1.42zM6.27 16.14l-1.44 1.39a1 1 0 0 0 0 1.42 1 1 0 0 0 .72.3 1 1 0 0 0 .67-.25l1.44-1.39a1 1 0 0 0-1.39-1.44zM12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4z" /></svg> },
  { id: "vitiligo", label: "Vitiligo", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><circle cx="12" cy="6" r="4" /><path d="M19 22v-3a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v3" /><path d="M6 16q1.5-1 2 0q0 1.5-2 1z" /><path d="M13.5 14q2-1 2.5 0q-1 2-2.5 1z" /><path d="M8 19q2-1 2.5 0.5q-1.5 1.5-2.5 0.5z" /><circle cx="15.5" cy="19.5" r="1" /></svg> },
  { id: "dermatosurgery", label: "Dermatosurgery", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><rect x="4" y="6" width="16" height="14" rx="2" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M12 10v6" /><path d="M9 13h6" /></svg> },
  { id: "laser-hair", label: "Laser Hair Reduction", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M13.5 2H10.5C9.1 2 8 3.1 8 4.5v3.2c0 .5-.2.9-.6 1.3L4 12v7c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3v-7l-3.4-3c-.4-.4-.6-.8-.6-1.3V4.5C16 3.1 14.9 2 13.5 2z" /><path d="M12 12v7" /><path d="M9 16h6" /></svg> },
  { id: "anti-ageing", label: "Anti-Ageing", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" y1="22" x2="12" y2="12" /></svg> },
];

export default function ServicesClient({ initialCategory }: ServicesClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Validate the initial category, fallback to hair-loss
  const defaultCategory = CATEGORIES.some((c) => c.id === initialCategory)
    ? (initialCategory as Treatment["category"])
    : "medical-dermatology";

  const [activeCategory, setActiveCategory] = useState<Treatment["category"]>(defaultCategory);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  // Sync category state from initial prop if it changes
  useEffect(() => {
    if (initialCategory && CATEGORIES.some((c) => c.id === initialCategory)) {
      setTimeout(() => setActiveCategory(initialCategory as Treatment["category"]), 0);
    }
  }, [initialCategory]);

  // Toggle body class to hide floating CTAs when modal is open
  useEffect(() => {
    if (selectedTreatment) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [selectedTreatment]);

  const handleCategoryChange = (category: Treatment["category"]) => {
    setActiveCategory(category);
    router.replace(`${pathname}?category=${category}`, { scroll: false });
  };

  const filteredTreatments = treatments.filter((t) => t.category === activeCategory);

  return (
    <div className="pt-32 pb-24 bg-[#F7F3EF]">
      {/* ─── HERO SECTION ─── */}
      <section className="max-w-5xl mx-auto px-6 mb-16 md:mb-20">
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2 border border-[#E4DFE8] rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8E5C8F]"></span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8E5C8F]">
              Treatments & Services
            </span>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <Reveal delay={0.2}>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl text-[#2E2E2E] leading-[1.1]"
              style={{ fontFamily: "var(--font-dm-serif), serif" }}
            >
              Precision Dermatology. Timeless Aesthetics.
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-sm md:text-base text-[#6B6570] leading-relaxed md:pt-4">
              At Amethyst, our procedures combine evidence-based medicine with state-of-the-art aesthetic technology. Under the leadership of Dr. Shruthi Pavana Janardhanan, we design custom protocols tailored to your unique skin biology to ensure safe, authentic, and life-changing results.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── CATEGORY TABS ─── */}
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 pb-6 border-b border-[#E4DFE8]">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id as Treatment["category"])}
                className={`flex items-center justify-start gap-2 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-3 sm:px-4 h-14 sm:h-[60px] w-full rounded-xl sm:rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#5A2A5D] text-white shadow-md shadow-[#5A2A5D]/10"
                    : "bg-white text-[#2E2E2E] border border-[#E4DFE8] hover:border-[#8E5C8F]"
                }`}
              >
                <span className={`flex-shrink-0 ${isActive ? "text-white" : "text-[#8E5C8F]"}`}>{cat.icon}</span>
                <span className="leading-tight line-clamp-2">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── TREATMENTS GRID ─── */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTreatments.map((t, idx) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-white rounded-[32px] border border-[#E4DFE8] overflow-hidden flex flex-col hover:border-[#8E5C8F] hover:shadow-xl transition-all duration-500"
              >
                {/* Image */}
                <div className="relative w-full h-[140px] md:h-[220px] overflow-hidden bg-[#FBF8F5] rounded-t-xl">
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${['picofusion', 'earlobe'].includes(t.id) ? 'object-bottom' : ''}`}
                  />
                </div>

                {/* Details */}
                <div className="p-3 md:p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-[15px] md:text-2xl text-[#2E2E2E] mb-2 md:mb-3 group-hover:text-[#5A2A5D] transition-colors leading-tight"
                      style={{ fontFamily: "var(--font-dm-serif), serif" }}
                    >
                      {t.name}
                    </h3>
                    <p className="text-[11px] md:text-[13px] text-[#6B6570] leading-relaxed mb-4 md:mb-6 line-clamp-3">
                      {t.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto pt-3 md:pt-4 border-t border-[#F5F0E8] gap-2 sm:gap-0">
                    <span className="text-[11px] font-medium text-[#9A94A0]">
                      Downtime: <span className="text-[#2E2E2E]">{t.downtime.split(" ")[0]}</span>
                    </span>
                    <button
                      onClick={() => setSelectedTreatment(t)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#5A2A5D] hover:text-[#8E5C8F] transition-colors"
                    >
                      Learn More
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>




      {/* ─── SERVICE FAQS ─── */}
      <section className="max-w-3xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl text-[#2E2E2E] mb-3"
            style={{ fontFamily: "var(--font-dm-serif), serif" }}
          >
            Service FAQs
          </h2>
          <p className="text-xs text-[#6B6570]">Common questions regarding our clinic treatments</p>
        </div>

        <div className="flex flex-col gap-4">
          {[
            {
              q: "How do I know which treatment is right for my concerns?",
              a: "During your initial consultation, Dr. Shruthi Pavana Janardhanan performs a complete clinical examination and digital skin analysis. We review your medical history, current skin concerns, and goals to design a fully customized, multi-modal treatment program."
            },
            {
              q: "Are the procedures safe for sensitive or darker skin tones?",
              a: "Yes, absolutely. We use premium devices equipped with fractional delivery systems and customizable settings. For example, our Picosecond laser toning and MNRF microneedling are globally recognized as safe and effective for Fitzpatrick skin types I through VI, presenting minimal risk of hyperpigmentation."
            },
            {
              q: "Is there any preparation required before starting a procedure?",
              a: "Yes. Depending on the procedure, we advise avoiding active topicals (like retinols, glycolic acid, or salicylic acid) for 3-5 days prior. For lasers and chemical peels, strict sun protection and avoidance of tanning for 2 weeks prior is mandatory."
            },
            {
              q: "How many sessions are typically required to see results?",
              a: "Aesthetic concerns like scarring and pigmentation usually require a series of 3 to 6 sessions spaced 4 weeks apart to achieve long-term remodeling. Quick procedures like skin tags and milia extraction are resolved instantly in a single session."
            }
          ].map((faq, idx) => (
            <Reveal key={idx} delay={0.1 + idx * 0.1}>
            <details
              className="card-hover group bg-white rounded-2xl border border-[#E4DFE8] p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer hover:border-[#8E5C8F] transition-all"
            >
              <summary className="flex items-center justify-between gap-4 font-semibold text-sm md:text-base text-[#2E2E2E] select-none list-none">
                <span>{faq.q}</span>
                <span className="w-6 h-6 rounded-full bg-[#F2EAF3] text-[#8E5C8F] flex items-center justify-center text-xs group-open:rotate-45 transition-transform duration-300">
                  +
                </span>
              </summary>
              <p className="text-xs md:text-sm text-[#6B6570] leading-relaxed mt-4 pt-4 border-t border-[#F5F0E8] cursor-default">
                {faq.a}
              </p>
            </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="max-w-5xl mx-auto px-6">
        <div
          className="relative rounded-[32px] md:rounded-[48px] overflow-hidden min-h-[300px] flex items-center justify-center p-8 md:p-12 text-center"
          style={{
            background: "linear-gradient(135deg, #5A2A5D 0%, #8E5C8F 60%, #CFA1A8 100%)",
          }}
        >
          <div className="max-w-xl relative z-10">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-dm-serif), serif" }}
            >
              Begin your personalized skin transformation
            </h2>
            <p className="text-[#F3DADF] text-xs sm:text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Schedule an in-depth consultation with Dr. Shruthi Pavana Janardhanan to map out a dedicated, result-oriented clinical protocol.
            </p>
            <a
              href="https://u.tatvacare.in/r/mDN7hS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#5A2A5D] px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#F8F6F9] transition-all duration-300 hover:-translate-y-0.5"
            >
              <Image src="/logo.svg" alt="" width={20} height={20} className="h-5 w-auto" /> Book Consultation
            </a>
          </div>
        </div>
      </section>

      {/* ─── CLINICAL DETAIL DRAWER ─── */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedTreatment && (
          <>
            {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTreatment(null)}
                className="fixed inset-0 bg-black z-[110] cursor-pointer"
              />

            {/* Sliding Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 w-full sm:w-[500px] md:w-[600px] bg-white z-[110] shadow-2xl border-l border-[#E4DFE8] flex flex-col overflow-hidden"
              >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#E4DFE8]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedTreatment(null)}
                    className="md:hidden flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#5B1F6A] bg-[#F7F3EF] px-3 py-1.5 rounded-full"
                  >
                    <span>←</span> Back
                  </button>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8E5C8F] bg-[#F2EAF3] px-3 py-1 rounded-full hidden md:inline-block">
                    {activeCategory.replace("-", " ")}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTreatment(null)}
                  className="w-10 h-10 rounded-full hover:bg-[#F7F3EF] flex items-center justify-center text-[#6B6570] transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer Content (Scrollable) */}
              <div className="flex-grow overflow-y-auto p-6 md:p-8 scrollbar-thin">
                <h2
                  className="text-3xl md:text-4xl text-[#2E2E2E] mb-6 leading-tight"
                  style={{ fontFamily: "var(--font-dm-serif), serif" }}
                >
                  {selectedTreatment.name}
                </h2>

                {/* Cover Image */}
                <div className="relative h-[220px] md:h-[260px] w-full rounded-2xl overflow-hidden mb-8 border border-[#E4DFE8]">
                  <Image
                    src={selectedTreatment.img}
                    alt={selectedTreatment.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className={`object-cover ${['picofusion', 'earlobe'].includes(selectedTreatment.id) ? 'object-bottom' : ''}`}
                  />
                </div>

                {/* Description */}
                <p className="text-sm text-[#6B6570] leading-relaxed mb-8">
                  {selectedTreatment.description}
                </p>

                {/* Quick stats grid */}
                <div className="grid grid-cols-3 gap-3 bg-[#F7F3EF] border border-[#E4DFE8] rounded-2xl p-4 mb-8 text-center">
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.1em] text-[#9A94A0] mb-1">
                      ⏱ Duration
                    </span>
                    <span className="text-xs md:text-sm font-semibold text-[#2E2E2E]">
                      {selectedTreatment.duration.split(" ")[0]} mins
                    </span>
                  </div>
                  <div className="border-x border-[#E4DFE8]">
                    <span className="block text-[10px] uppercase tracking-[0.1em] text-[#9A94A0] mb-1">
                      🛡 Downtime
                    </span>
                    <span className="text-xs md:text-sm font-semibold text-[#2E2E2E]">
                      {selectedTreatment.downtime.split(" ")[0]}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.1em] text-[#9A94A0] mb-1">
                      🔄 Sessions
                    </span>
                    <span className="text-xs md:text-sm font-semibold text-[#2E2E2E]">
                      {selectedTreatment.sessions.split(" ")[0]} Recommended
                    </span>
                  </div>
                </div>

                {/* Technology used */}
                {selectedTreatment.technology && (
                  <div className="mb-8">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2E2E2E] mb-3">
                      Clinical Tech & Methods
                    </h4>
                    <p className="text-xs text-[#6B6570] bg-white border border-[#E4DFE8] rounded-xl px-4 py-3 leading-relaxed">
                      {selectedTreatment.technology}
                    </p>
                  </div>
                )}

                {/* Key Benefits */}
                <div className="mb-8">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2E2E2E] mb-3">
                    Expected Benefits
                  </h4>
                  <ul className="space-y-2">
                    {selectedTreatment.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#6B6570]">
                        <span className="text-[#8E5C8F] mt-0.5">✔</span>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pre-Care & Post-Care */}
                {selectedTreatment.preCare && selectedTreatment.preCare.length > 0 && (
                  <div className="mb-8 border-t border-[#F5F0E8] pt-6">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2E2E2E] mb-3">
                      Pre-Procedure Guidelines
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedTreatment.preCare.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-xs text-[#6B6570] leading-relaxed">
                          <span className="text-[#9A94A0] font-semibold">{idx + 1}.</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedTreatment.postCare && selectedTreatment.postCare.length > 0 && (
                  <div className="mb-8 border-t border-[#F5F0E8] pt-6">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2E2E2E] mb-3">
                      Post-Procedure Recovery
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedTreatment.postCare.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-xs text-[#6B6570] leading-relaxed">
                          <span className="text-[#9A94A0] font-semibold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA block before footer */}
                <div style={{ padding: '32px 20px', background: '#f3eaf8', borderRadius: '16px', margin: '0 0 24px', textAlign: 'center' }}>
                  <p style={{ color: '#5B1F6A', fontWeight: 700, fontSize: '18px', margin: '0 0 8px' }}>
                    Interested in this treatment?
                  </p>
                  <p style={{ color: '#666', fontSize: '14px', margin: '0 0 20px' }}>
                    Book a consultation with Dr. Shruthi Pavana Janardhanan
                  </p>
                  <a
                    href={`https://wa.me/918870445185?text=${encodeURIComponent(`Hi Amethyst Skin Clinic, I would like to book a consultation for ${selectedTreatment.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ background: '#5B1F6A', color: 'white', padding: '14px 32px', borderRadius: '24px', textDecoration: 'none', fontSize: '15px', fontWeight: 600, display: 'inline-block' }}
                  >
                    Book on WhatsApp
                  </a>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 border-t border-[#E4DFE8] bg-[#FBF8F5] flex gap-3">
                <a
                  href="https://u.tatvacare.in/r/mDN7hS"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedTreatment(null)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#5A2A5D] text-white text-xs font-semibold uppercase tracking-[0.1em] py-4 rounded-xl hover:bg-[#4A1F4D] transition-colors"
                >
                  <Image src="/logo-cream.svg" alt="" width={20} height={20} className="h-5 w-auto" /> Book Treatment Session
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body
      )}
    </div>
  );
}
