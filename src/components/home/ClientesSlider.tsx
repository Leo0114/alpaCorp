import { Autoplay, Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/a11y";

export interface ClientLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ClientesSliderProps {
  logos: ClientLogo[];
}

export function ClientesSlider({ logos }: ClientesSliderProps) {
  return (
    <div className="relative px-10 sm:px-12">
      <Swiper
        modules={[Autoplay, Navigation, A11y]}
        className="w-full"
        loop={logos.length > 4}
        speed={700}
        autoplay={{ delay: 2200, disableOnInteraction: false }}
        spaceBetween={24}
        slidesPerView={2}
        navigation={{
          prevEl: ".client-slider-prev",
          nextEl: ".client-slider-next",
        }}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        a11y={{ enabled: true }}
      >
        {logos.map((logo) => (
          <SwiperSlide key={logo.src} className="!h-auto">
            <div className="flex h-28 items-center justify-center rounded-2xl border border-line bg-canvas px-6 py-4 shadow-xs transition duration-300 hover:shadow-md hover:border-secondary/40">
              <img
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                loading="lazy"
                decoding="async"
                className="max-h-16 w-auto object-contain transition duration-300"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Indicadores laterales (Navigation Controls) con color secondary */}
      <button
        type="button"
        aria-label="Anterior cliente"
        className="client-slider-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line bg-canvas text-secondary shadow-md transition-all duration-200 hover:scale-110 hover:bg-secondary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Siguiente cliente"
        className="client-slider-next absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line bg-canvas text-secondary shadow-md transition-all duration-200 hover:scale-110 hover:bg-secondary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default ClientesSlider;
