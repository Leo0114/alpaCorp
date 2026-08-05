import { useState, useRef, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, A11y } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/a11y";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface HeroSlide {
  topTag: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaHref: string;
  image: { src: string };
  imageAlt: string;
}

interface HeroSliderProps {
  slides: readonly HeroSlide[];
}

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

const tagVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: { opacity: 0, x: -16, transition: { duration: 0.3 } },
};

// ---------------------------------------------------------------------------
// Sub-component: lateral bullet indicators
// ---------------------------------------------------------------------------
function LateralIndicators({
  count,
  active,
  progress,
  onGoto,
}: {
  count: number;
  active: number;
  progress: number; // 0–1 progress of current slide's autoplay
  onGoto: (index: number) => void;
}) {
  return (
    <div
      className="absolute left-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
      role="tablist"
      aria-label="Navegación de slides"
    >
      {Array.from({ length: count }, (_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            role="tab"
            aria-selected={isActive}
            aria-label={`Slide ${i + 1}`}
            onClick={() => onGoto(i)}
            className="group relative flex h-10 w-1 cursor-pointer items-center justify-center rounded-full bg-white/20 transition-all duration-300 hover:bg-white/40"
          >
            {/* Track */}
            <span className="absolute inset-0 rounded-full bg-white/20" />
            {/* Fill — only animates on the active slide */}
            {isActive && (
              <motion.span
                key={`fill-${active}`}
                className="absolute left-0 top-0 w-full rounded-full bg-secondary"
                initial={{ height: "0%" }}
                animate={{ height: `${progress * 100}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            )}
            {/* Inactive dot */}
            {!isActive && (
              <span className="absolute inset-0 rounded-full bg-white/30 group-hover:bg-white/60 transition-colors" />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-component: slide content (animated on key change)
// ---------------------------------------------------------------------------
function SlideContent({ slide, key: _key }: { slide: HeroSlide; key: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={_key}
        className="relative z-10 max-w-2xl"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Top tag */}
        <motion.p
          variants={tagVariants}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-secondary"
        >
          {slide.topTag}
        </motion.p>

        {/* Headline */}
        <motion.h1
          custom={0.1}
          variants={textVariants}
          className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl"
        >
          {slide.title}
        </motion.h1>

        {/* Divider */}
        <motion.span
          custom={0.25}
          variants={textVariants}
          className="mt-6 block h-1 w-16 rounded-full bg-secondary"
        />

        {/* Subtitle */}
        <motion.p
          custom={0.35}
          variants={textVariants}
          className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          {slide.subtitle}
        </motion.p>

        {/* CTA */}
        <motion.a
          custom={0.5}
          variants={textVariants}
          href={slide.ctaHref}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-primary hover:-translate-y-0.5"
        >
          {slide.cta}
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </motion.a>
      </motion.div>
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function HeroSlider({ slides }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const AUTOPLAY_DELAY = 5000;

  const updateProgress = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const p = Math.min(elapsed / AUTOPLAY_DELAY, 1);
    setProgress(p);
    if (p < 1) {
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  const resetProgress = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startTimeRef.current = Date.now();
    setProgress(0);
    rafRef.current = requestAnimationFrame(updateProgress);
  }, [updateProgress]);

  useEffect(() => {
    resetProgress();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex, resetProgress]);

  const goTo = useCallback(
    (index: number) => {
      swiperRef.current?.slideTo(index);
      setActiveIndex(index);
      resetProgress();
    },
    [resetProgress],
  );

  return (
    <section
      aria-label="Presentación principal de Empaques Industriales ALPA"
      className="relative min-h-[90vh] overflow-hidden"
    >
      <Swiper
        modules={[Autoplay, EffectFade, A11y]}
        effect="fade"
        loop={false}
        speed={900}
        autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
        a11y={{ enabled: true }}
        className="h-full w-full"
        style={{ minHeight: "inherit" }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          resetProgress();
        }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} className="relative min-h-[90vh]">
            {/* Background image */}
            <img
              src={slide.image.src}
              alt={slide.imageAlt}
              className="absolute inset-0 h-full w-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
            />

            {/* Overlay gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40"
              aria-hidden="true"
            />

            {/* Decorative slide number */}
            <div
              className="absolute right-8 top-1/2 hidden -translate-y-1/2 select-none lg:block"
              aria-hidden="true"
            >
              <span className="font-display text-[12rem] font-extrabold leading-none text-white/5">
                0{idx + 1}
              </span>
            </div>

            {/* Content */}
            <div className="container-x relative flex min-h-[90vh] items-center py-24">
              <SlideContent slide={slide} key={`slide-${activeIndex}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lateral indicators */}
      <LateralIndicators
        count={slides.length}
        active={activeIndex}
        progress={progress}
        onGoto={goTo}
      />

      {/* Bottom slide counter */}
      <div className="absolute bottom-8 right-8 z-20 hidden items-center gap-3 sm:flex">
        <span className="text-2xl font-bold text-white">
          0{activeIndex + 1}
        </span>
        <span className="h-px w-10 bg-white/30" />
        <span className="text-sm text-white/50">0{slides.length}</span>
      </div>
    </section>
  );
}
